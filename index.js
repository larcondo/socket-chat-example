const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const PORT = 3000;

async function main() {
  // open the database file
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  // create our 'message' table (you can ignore the 'client_offset' column for now)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  io.on('connection', async (socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result;
      try {
        // store the message in the database
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
      } catch(e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
          // the message was already inserted, so we notify the client
          callback();
        } else {
          // nothing to do, just let the client query
        }
        return;
      }

      // include the offset with the message
      io.emit('chat message', msg, result.lastID);
      // acknowledge the event
      callback();
    });

    if (!socket.recovered) {
      // if the connection state recovery was not successful
      try {
        await db.each('SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit('chat message', row.content, row.id);
          }
        )
      } catch(e) {
        console.log('FAIL: state recovery fail!');
        // something went wrong
      }
    }
  });
  
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

main();