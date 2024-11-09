import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    phone_number: number;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    role: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: false,
    },
    address: {
        type: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model<IUser>('UserModel', UserSchema);
export default UserModel;