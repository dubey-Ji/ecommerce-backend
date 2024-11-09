import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
export interface IInvoice extends Document {
    userId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
}

const InvoiceSchema = new Schema({
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
    totalAmount: {
        type: Number,
        required: true
    }
});

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);

export default Invoice;
