import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js';
import cors from 'cors'

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

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

app.listen(port, () => {
    console.log("Server is running now");
})