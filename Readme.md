# Socket.IO - Ejemplo

Este es un ejemplo básico de una aplicación de chat utilizando **Socket.IO**.  
La aplicación fue creada en base al tutorial que se describe en la propia página de [Socket.IO](https://socket.io/docs/v4/tutorial/introduction).

## Iniciar aplicación

### Modo desarrollo

Ejecutar el comando en consola:
```console
npm run dev
```

### Modo producción

Ejecutar el comando en consola:
```console
npm start
```

### Cliente

En el navegador, ingresar la dirección:
```
http://localhost:3000
```

Para verificar el *scaling horizontally*, ingresar en 4 pestañas diferentes con las siguientes direcciones:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`
- `http://localhost:3003`

> NOTA:  
El número de pestañas puede variar dependiendo de la cantidad de núcleos que tenga el procesador que ejecute la aplicación (en este ejemplo en particular, posee 4, pero pueden ser más o menos).

## Dependencias requeridas

Los siguientes paquetes son necesarios para este ejemplo de aplicación de char básica:

- **express**  
  `npm install express`
- **socket.io**  
  `npm install socket.io`
- **sqlite**  
  `npm install sqlite`
- **sqlite3**  
  `npm install sqlite3`
- **@socket.io/cluster-adapter**  
  `npm install @socket.io/cluster-adapter`