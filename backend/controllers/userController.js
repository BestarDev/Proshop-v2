import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {generateToken} from '../utils/generateToken.js';

// @ desc       Auth User
// @ route      POST /api/users/login
// @ access     Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @ desc       Register User
// @ route      POST /api/users
// @ access     Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({email})

    if(existUser) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, email, password
    })

    if(user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// @ desc       Logout User
// @ route      POST /api/users/logout
// @ access     Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Log out successfully' })
}

// @ desc       Get User Profile
// @ route      Get /api/users/profile
// @ access     Private
const getProfile = asyncHandler(async(req, res) => {
    res.json("Get User Profile");
})

// @ desc       Update User Profile
// @ route      PUT /api/users/profile
// @ access     Private
const updateProfile = asyncHandler(async(req, res) => {
    res.json("Update User Profile");
})

// @ desc       Get Users
// @ route      Get /api/users
// @ access     Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.json("Get All Users");
})

// @ desc       Get User By ID
// @ route      Get /api/users/:id
// @ access     Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    res.json("Get User By ID");
})

// @ desc       Update User
// @ route      PUT /api/users/:id
// @ access     Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    res.json("Update User Profile");
})

// @ desc       Delete User
// @ route      DELETE /api/users/:id
// @ access     Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.json("Get User Profile");
})

export {
    authUser,
    registerUser,
    logoutUser,
    getProfile,
    updateProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}