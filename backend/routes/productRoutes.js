import express from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
/************************************** Important ****************************/
/*  Line 1 must be on top of Line 2. If you swap them, you will get an error  /
/*   "Resource Not Found"                                                     /
/*****************************************************************************/
router.route('/top').get(getTopProducts);   // Line 1
router.route('/:id').get(getProductById).put(protect, admin, updateProduct)   // Line 2
                    .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);
export default router;