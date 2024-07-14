# Proyecto de FakeAPI para el Challenge de AluraGeek

Este proyecto implementa una API RESTful utilizando Express para la gestión de productos. Permite realizar operaciones básicas como obtener productos, agregar nuevos productos y eliminar productos existentes. Los datos de los productos se almacenan en un archivo JSON local.

## Tecnologías utilizadas

- Node.js
- Express.js
- Cors
- fs (File System)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias usando npm:

    ```
    npm install
    ```

3. Asegúrate de tener Node.js y npm instalados en tu sistema.

## Uso

1. Inicia el servidor ejecutando:

    ```
    node server.js
    ```

2. La API estará disponible en `http://localhost:3001`.

## Endpoints

- **GET /products**: Obtiene todos los productos.
- **POST /products**: Agrega un nuevo producto.
  - Campos requeridos en el cuerpo de la solicitud: `name`, `price`, `image`.
- **DELETE /products/:id**: Elimina un producto por su ID.

## Estructura de la Base de Datos

Los datos de los productos se almacenan en un archivo JSON ubicado en `./database/db.json`. Cada producto tiene los campos `id`, `name`, `price` y `image`.
