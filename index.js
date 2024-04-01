const express = require('express');
const { createServer } = require('node:http');
const PORT = 3000;
const app = express();
const server = createServer(app);

const htmlContent = `
  <h1>Hello World!</h1>
  <p>socket.io application example</p>
`

app.get('/', (req, res) => {
  res.send(htmlContent);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});