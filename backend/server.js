import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors'
import productRouter from './routes/productRoutes.js';

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("This is server")
})

app.use('/api/products', productRouter);

app.listen(port, () => {
    console.log("Server is running now");
})