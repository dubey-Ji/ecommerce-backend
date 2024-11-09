import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authentication.middleware';
import { authorize } from '../middleware/authorization.middleware';
import { createProduct, getProductById, updateProduct, deleteProduct, getAllProducts, getProductByCategory, getProductByFilter, addProductImage } from '../controllers/product.controller';
import multer from 'multer';
import ApiResponse from '../utils/ApiReponse';
import ApiError from '../utils/ApiError';


const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', authenticate, authorize(['admin']), async (req: Request, res: Response): Promise<void> => {
    const product = await createProduct(req, res);
    const response = new ApiResponse(true, 'Product created successfully', product);
    res.status(201).json(response);
    return;
});
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const product = await getProductById(req, res);
    const response = new ApiResponse(true, 'Product fetched successfully', product);
    res.status(200).json(response);
    return;
});
router.put('/:id', authenticate, authorize(['admin']), async (req: Request, res: Response): Promise<void> => {
    const product = await updateProduct(req, res);
    const response = new ApiResponse(true, 'Product updated successfully', product);
    res.status(200).json(response);
    return;
});
router.delete('/:id', authenticate, authorize(['admin']), async (req: Request, res: Response): Promise<void> => {
    await deleteProduct(req, res);
    const response = new ApiResponse(true, 'Product deleted successfully', null);
    res.status(200).json(response);
    return;
});
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const products = await getAllProducts(req, res);
    const response = new ApiResponse(true, 'Products fetched successfully', products);
    res.status(200).json(response);
    return;
});    
router.get('/category/:category', async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('req.params', req.params);
        const products = await getProductByCategory(req, res);
        const response = new ApiResponse(true, 'Products fetched successfully', products);
        res.status(200).json(response);
        return;
    } catch (error) {
        const apiError = new ApiError(false, 'Internal server error', error);
        res.status(500).json(apiError);
        return;
    }
});
router.get('/filter/:filter', async (req: Request, res: Response): Promise<void> => {
    const products = await getProductByFilter(req, res);
    const response = new ApiResponse(true, 'Products fetched successfully', products);
    res.status(200).json(response);
    return;
});

router.post('/image', authenticate, authorize(['admin']), upload.single('file'), async (req: Request, res: Response): Promise<void> => {
    const product = await addProductImage(req, res);
    const response = new ApiResponse(true, 'Product image added successfully', product);
    res.status(200).json(response);
    return;
});
export default router
