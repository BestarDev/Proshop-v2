import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler'

// @desc    Create New Order
// @route   POST api/orders
// @access  Private
export const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
    } = req.body;
    if(orderItems && orderItems.length === 0) {
        res.status(404);
        throw new Error('No Order Item');
    } else {
        const order = new Order({
            orderItems: orderItems.map(x => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            taxPrice 
        })
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
})

// @desc    Get logged in user orders
// @route   GET api/orders/mine
// @access  Private
export const getMyOrders = asyncHandler(async(req, res) => {
   const order = await Order.find({user: req.user._id});
   res.status(200).json(order);
})

// @desc    Get Order By Id
// @route   GET api/orders/:id
// @access  Private/Admin
export const getOrderById = asyncHandler(async(req, res) => {
    const order= await Order.findById(req.params.id).populate('user', 'name email');
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
})

// @desc    Update order to paid
// @route   PUT api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async(req, res) => {
    res.send('Update order to paid')
})

// @desc    Update order to Delivered
// @route   PUT api/orders/:id/deliver
// @access  Private
export const updateOrderToDeliver = asyncHandler(async(req, res) => {
    res.send('Update order to delivered')
})

// @desc    Get All Orders
// @route   GET api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async(req, res) => {
    res.send('Get All Orders')
})