import WishlistService from "../service/wishlist.services";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiReponse";
import ApiError from "../utils/ApiError";
import { CategoriesService } from "../service/categories.services";

class WishlistController {
    private wishlistService = new WishlistService();
    private categoriesService = new CategoriesService();

    createWishlist = async (req: Request, res: Response) => {
        try {   
            const { productId } = req.body;
            const userId = req.user._id;
            const wishlist = await this.wishlistService.createWishlist(productId, userId);
            const response = new ApiResponse(true, 'Wishlist created successfully', wishlist);
            res.status(201).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            res.status(500).json({success: apiError.success, message: apiError.message, data: apiError.data});
        }
    }

    getWishlist = async (req: Request, res: Response) => {
        try {
            const userId = req.user._id;
            let wishListData: any[] = [];
            const wishlist = await this.wishlistService.getWishlist(userId);
            if (wishlist.length === 0) {
                const apiError = new ApiError(false, 'Wishlist is empty', null);
                return res.status(200).json({success: apiError.success, message: apiError.message, data: apiError.data});
            }
            wishListData = JSON.parse(JSON.stringify(wishlist));
            const categories = await this.categoriesService.getAllCategories();
            console.log('categories', categories);
            wishListData.forEach((item: any) => {
                const product = item.product;
                const category = categories.find((category: any) => category._id.toString() === product.category.toString());
                console.log('category', category);
                product.categoryName = category?.name;
            });
            const response = new ApiResponse(true, 'Wishlist fetched successfully', wishListData);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({success: apiError.success, message: apiError.message, data: apiError.data});
        }
    }

    deleteWishlist = async (req: Request, res: Response) => {
        try {
            const wishlistId = req.params.id;
            const wishlist = await this.wishlistService.deleteWishlist(wishlistId);
            const response = new ApiResponse(true, 'Wishlist deleted successfully', wishlist);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({success: apiError.success, message: apiError.message, data: apiError.data});
        }
    }

    clearWishlist = async (req: Request, res: Response) => {
        try {
            const userId = req.user._id;
            const wishlist = await this.wishlistService.clearWishlist(userId);
            const response = new ApiResponse(true, 'Wishlist cleared successfully', wishlist);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({success: apiError.success, message: apiError.message, data: apiError.data});
        }
    }

    deleteWishlistByProductIdAndUserId = async (req: Request, res: Response) => {
        try {
            const productId = req.params.productId;
            const userId = req.user._id;
            const wishlist = await this.wishlistService.deleteWishlistByProductIdAndUserId(productId, userId);
            const response = new ApiResponse(true, 'Wishlist deleted successfully', wishlist);
            return res.status(200).json({success: response.success, message: response.message, data: response.data});
        } catch (error) {
            const apiError = new ApiError(false, (error as Error).message, null);
            return res.status(500).json({success: apiError.success, message: apiError.message, data: apiError.data});
        }
    }

}

export default WishlistController;