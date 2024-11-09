import mongoose, {Schema, Document} from "mongoose";

export interface ICart extends Document {
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartItem {
    productId: string;
    quantity: number;
}

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;