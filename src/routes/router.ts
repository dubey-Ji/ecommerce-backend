import express, { Router, type Response, type Request} from 'express';
import authRouter from './auth.router';
import productRouter from './product.routes';
import categoryRouter from './categories.routes';
import wishlistRouter from './wishlist.routes';
import cartRouter from './cart.routes';
import reviewsRouter from './reviews.routes';
import ordersRouter from './orders.routes';
const router = express.Router();


router.get('/ping', (req: Request, res: Response)  => {
    res.status(200).json({success: false, message: "Pong"});
});

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/wishlist', wishlistRouter);
router.use('/cart', cartRouter);
router.use('/reviews', reviewsRouter);
router.use('/orders', ordersRouter);
export default router;
