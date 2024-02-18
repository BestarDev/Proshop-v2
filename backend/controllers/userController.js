import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @ desc       Auth User
// @ route      POST /api/users/login
// @ access     Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
    
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

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
    res.json("Register User");
})

// @ desc       Logout User
// @ route      POST /api/users/logout
// @ access     Public
const logoutUser = asyncHandler(async(req, res) => {
    res.json("Logout User");
})

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