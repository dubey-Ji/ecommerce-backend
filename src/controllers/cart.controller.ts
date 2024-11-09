import { Request, Response } from "express";
import { CartService } from "../service/cart.services";
import Cart from "../models/cart.models";
import ApiResponse from "../utils/ApiReponse";
import ApiError from "../utils/ApiError";

class CartController {
    private cartService = new CartService(Cart);

    addToCart = async (req: Request, res: Response) => {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user?.id;
            const cartItem = await this.cartService.addToCart(userId, productId, quantity);
            const response = new ApiResponse(true, 'Cart item added successfully', cartItem);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({ success: apiError.success, message: apiError.message, data: apiError.data });
        }
    }

    getCart = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const cart = await this.cartService.getCartItems(userId);
            const response = new ApiResponse(true, 'Cart items fetched successfully', cart);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({ success: apiError.success, message: apiError.message, data: apiError.data });
        }
    }

    removeFromCart = async (req: Request, res: Response) => {
        try {
            const { productId } = req.params;
            const userId = req.user?.id;
            const cartItem = await this.cartService.removeFromCart(userId, productId);
            const response = new ApiResponse(true, 'Cart item removed successfully', cartItem);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({ success: apiError.success, message: apiError.message, data: apiError.data });
        }
    }

    clearCart = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            await this.cartService.deleteCart(userId);
            const response = new ApiResponse(true, 'Cart cleared successfully', null);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({ success: apiError.success, message: apiError.message, data: apiError.data });
        }
    }

}

export default CartController;