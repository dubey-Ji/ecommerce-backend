import { Router } from 'express';
import { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory } from '../controllers/categories.controller';

const router = Router();

router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;