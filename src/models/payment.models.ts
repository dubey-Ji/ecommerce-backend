import mongoose, {Schema, Document} from "mongoose";

export interface IPayment extends Document {
    userId: string;
    orderId: string;
    amount: number;
    method: string;
    status: string;
    transactionId: string;
    createdAt: Date;
}

const PaymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ['credit card', 'debit card', 'paypal', 'cash on delivery'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true
    },
    transactionId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;