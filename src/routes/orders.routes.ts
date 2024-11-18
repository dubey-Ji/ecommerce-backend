import { Router, Request, Response } from "express";
import OrdersController from "../controllers/orders.controllers";
import OrdersService from "../service/orders.services";
import { authenticate } from "../middleware/authentication.middleware";
import { ProductsService } from "../service/products.service";
import { StripeService } from "../service/stripe.services";
import ProductModel from "../models/product.models";
import { CartService } from "../service/cart.services";
import CartModel from "../models/cart.models";
import ApiResponse from "../utils/ApiReponse";

const router = Router();
const ordersService = new OrdersService();
const stripeService = new StripeService(process.env.STRIPE_SECRET_KEY || '');
const productsService = new ProductsService(ProductModel);
const cartService = new CartService(CartModel);
const ordersController = new OrdersController(ordersService, stripeService, productsService, cartService);

router.post('/', authenticate, async (req: Request, res: Response) => {
    const order = await ordersController.createOrder(req, res);
    const apiResponse = new ApiResponse(true, 'Order created successfully', order);
    res.status(201).json(apiResponse);
    return;
});
router.get('/', authenticate, async (req: Request, res: Response) => {
    const orders = await ordersController.getOrders(req, res);
    const apiResponse = new ApiResponse(true, 'Orders fetched successfully', orders);
    res.status(200).json(apiResponse);
    return;
});
router.get('/:id', authenticate, async (req: Request, res: Response) => {
    const order = await ordersController.getOrderById(req, res);
    const apiResponse = new ApiResponse(true, 'Order fetched successfully', order);
    res.status(200).json(apiResponse);
    return;
});
router.put('/:id', authenticate, async (req: Request, res: Response) => {
    const order = await ordersController.updateOrder(req, res);
    const apiResponse = new ApiResponse(true, 'Order updated successfully', order);
    res.status(200).json(apiResponse);
    return;
});
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    await ordersController.deleteOrder(req, res);
    const apiResponse = new ApiResponse(true, 'Order deleted successfully', null);
    res.status(200).json(apiResponse);
    return;
});
router.get('/user/:userId', authenticate, async (req: Request, res: Response) => {
    const orders = await ordersController.getOrdersByUserId(req, res);
    const apiResponse = new ApiResponse(true, 'Orders fetched successfully', orders);
    res.status(200).json(apiResponse);
    return;
});
router.post('/create-checkout-session', authenticate, async (req: Request, res: Response) => {
    console.log('create-checkout-session');
    const session = await ordersController.createCheckoutSession(req, res);
    const apiResponse = new ApiResponse(true, 'Checkout session created successfully', session);
    res.status(200).json(apiResponse);
    return;
});
router.get('/checkout-session/:sessionId', authenticate, async (req: Request, res: Response) => {
    const session = await ordersController.getCheckoutSession(req, res);
    const apiResponse = new ApiResponse(true, 'Checkout session fetched successfully', session);
    res.status(200).json(apiResponse);
    return;
});

export default router;