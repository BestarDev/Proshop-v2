import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        return res.json(product);
    }

    res.status(404).json({message: 'Product Not Found'});
})

export { getProducts, getProductById };