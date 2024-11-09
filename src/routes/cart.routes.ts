import { Router, Request, Response } from "express";
import { authenticate } from "../middleware/authentication.middleware";

import CartController from "../controllers/cart.controller";

const router = Router();
const cartController = new CartController();

router.post('/', authenticate, async (req: Request, res: Response) => {
    await cartController.addToCart(req, res);
});

router.get('/', authenticate, async (req: Request, res: Response) => {
    await cartController.getCart(req, res);
});

router.delete('/remove-from-cart/:productId', authenticate, async (req: Request, res: Response) => {
    await cartController.removeFromCart(req, res);
});

router.delete('/clear-cart', authenticate, async (req: Request, res: Response) => {
    await cartController.clearCart(req, res);
});

export default router;