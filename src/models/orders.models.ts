import mongoose, {Schema, Document} from "mongoose";

export interface IOrder extends Document {
    userId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    status: string; 
    createdAt: Date;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
}

const OrderSchema = new Schema({
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
            },
            price: {
                type: Number,
                required: true
            }   
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit card', 'debit card', 'paypal', 'cash on delivery']
    }
})

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;