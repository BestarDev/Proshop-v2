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

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user:req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createProduct = await product.save();
    res.status(201).json(createProduct);
})

const updateProduct = asyncHandler(async(req, res) => {
    const { name, price, description, brand, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.image = image
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)

    if(product) {
        await Product.deleteOne({_id: productId})
        res.status(200).json({
            message: 'Product Deleted Successfully'
        })
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
})

const createProductReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(404)
            throw new Error('Already Reviewed')
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating), comment
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({message: 'Review Added'});
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };