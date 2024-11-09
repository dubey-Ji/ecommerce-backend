import Wishlist from "../models/wishlist.models";

class WishlistService {
    createWishlist = async (productId: string, userId: string) => {
        try {
            const existingWishlist = await Wishlist.findOne({ product: productId, userId });
            if (existingWishlist) {
                throw new Error('Product already in wishlist');
            }
            const wishlist = await Wishlist.create({ product: productId, userId });
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    getWishlist = async (userId: string) => {
        try {
            const wishlist = await Wishlist.find({ userId }).populate('product');
            return wishlist;
        } catch (error) {
            console.log('error', error);
            throw new Error(error as string);
        }
    }

    deleteWishlist = async (wishlistId: string) => {
        try {
            const wishlist = await Wishlist.findByIdAndDelete(wishlistId);
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    deleteWishlistByProductId = async (productId: string, userId: string) => {
        try {
            const wishlist = await Wishlist.findOneAndDelete({ product: productId, userId });
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    deleteWishlistByUserId = async (userId: string) => {
        try {
            const wishlist = await Wishlist.deleteMany({ userId });
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    deleteWishlistByProductIdAndUserId = async (productId: string, userId: string) => {
        try {
            const wishlist = await Wishlist.findOneAndDelete({ product: productId, userId });
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    clearWishlist = async (userId: string) => {
        try {
            const wishlist = await Wishlist.deleteMany({ userId });
            return wishlist;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default WishlistService;