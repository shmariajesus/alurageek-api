const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dbFilePath = path.join(__dirname, 'database', 'db.json');
const newDBFilePath = path.join('/tmp', 'db.json')
let items = [];
let nextId = 0;

// Leer archivo JSON de base
const loadItems = () => {
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return;    
        }

        try {
            const jsonData = JSON.parse(data);
            items = jsonData.products;

            // Calcular el próximo ID
            if (items.length > 0) {
                nextId = Math.max(...items.map(item => parseInt(item.id, 10))) + 1;
            }
        } catch (err) {
            console.error('Error al leer el archivo JSON:', err);
        }
    })
};

loadItems();

// Enpoint para obtener productos
app.get('/products', (req, res) => {
    res.json(items);
});

// Endpoint para agregar producto
app.post('/products', (req, res) => {
    const item = req.body;

    if (!item.name || !item.price || !item.image) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    item.id = String(nextId++);
    items.push(item);

    // Guardar los cambios en el archivo JSON
    fs.writeFile(newDBFilePath, JSON.stringify({ products: items }, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo JSON:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.status(201).json(item);
    })
});

// Endpoint para eliminar producto
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(prod => prod.id !== id);

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync(newDBFilePath, JSON.stringify({ products: items }, null, 2));
    
    res.status(200).json({ message: 'Producto eliminado' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Sirviendo en puerto: ${PORT}`);
});

module.exports = app