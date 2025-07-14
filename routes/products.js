import { Router } from 'express';
import { getAllProducts, getProduct, addNewProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = Router();

router.route('/').get(getAllProducts).post(addNewProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;