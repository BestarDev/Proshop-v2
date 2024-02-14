import express from 'express'
import products from './data/products.js';

const app = express();

app.get('/', (req, res) => {
    res.send("This is server")
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((x) => x._id === req.params.id);
    res.send(product);
})

app.listen(5000, () => {
    console.log("Server is running now");
})