import express from 'express'
import { authUser, registerUser, logoutUser, getProfile, updateProfile, 
    getUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//router.route('/url').method(requestHandler)   ||   router.method('/url', requestHandler)
router.route('/').get(protect, admin, getUsers)
                 .post(registerUser)
router.route('/profile').put(protect, updateProfile)
                        .get(protect, getProfile)
router.route('/login').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/:id').get(protect, admin, getUserById)
                    .put(protect, admin, updateUser)
                    .delete(protect, admin, deleteUser)

export default router;