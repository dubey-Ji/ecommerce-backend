import mongoose, { Schema, Document } from "mongoose";
import { IReview } from "./reviews.models";

export interface IProductRegister {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: Schema.Types.ObjectId;
    categoryName: string;
    status: string;
}

// Define the Product interface
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    rating: {
        userId: Schema.Types.ObjectId;
        rating: number;
        comment?: string;
    }[];
    stripeProductId?: string;
    stripePriceId?: string;
    reviews?: IReview[];
    status: string;
    feature?: boolean;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    rating: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: false
            },
        },
    ],
    stripeProductId: {
        type: String,
        required: false
    },
    stripePriceId: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        required: true,
        default: 'draft'
    },
    feature: {
        type: Boolean,
        required: false,
        default: false
    }
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;