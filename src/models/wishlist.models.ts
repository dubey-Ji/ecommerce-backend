import { IProduct } from "./product.models";
import mongoose, { Schema, Document } from "mongoose";
export interface IWishlist extends Document {
    product: IProduct;
    userId: Schema.Types.ObjectId;
}

const WishlistSchema = new Schema<IWishlist>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;