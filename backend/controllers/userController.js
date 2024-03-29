import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
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
    const user = await User.findById(req.user._id);

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not Found')
    }
})

// @ desc       Update User Profile
// @ route      PUT /api/users/profile
// @ access     Private
const updateProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const {name, email, password} = req.body;
    if(user) {
        user.name = name || user.name;
        user.email = email || user.email;
        if(password){
            user.password = password
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not Found')
    }
})

// @ desc       Get Users
// @ route      Get /api/users
// @ access     Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(200).json(users);
})

// @ desc       Get User By ID
// @ route      Get /api/users/:id
// @ access     Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User Not Found')
    }
})

// @ desc       Update User
// @ route      PUT /api/users/:id
// @ access     Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @ desc       Delete User
// @ route      DELETE /api/users/:id
// @ access     Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error('Cannot Delete Admin User')
        } else {
            await User.deleteOne({_id: user._id})
            res.status(200).json({
                message: 'User Deleted Successfully'
            })
        }
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
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