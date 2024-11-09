import mongoose, {Schema, Document} from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    createdAt: Date;
}

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;