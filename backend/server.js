import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send("This is server")
})

app.use('/api/products', productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is running now");
})