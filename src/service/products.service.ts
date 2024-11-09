import { Model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { IProduct, IProductRegister } from '../models/product.models';
import { StripeService } from './stripe.services';
import { CategoriesService } from './categories.services';

const apiKey = process.env.STRIPE_SECRET_KEY || '';
const stripeService = new StripeService(apiKey);
const categoryService = new CategoriesService();

export class ProductsService {
    private productModel: Model<IProduct>;

    constructor(productModel: Model<IProduct>) {
        this.productModel = productModel;
    }

    async createProduct(product: IProductRegister) {
        try {
            const category = await categoryService.getCategoryByName(product.categoryName);
            if (!category) {
                throw new Error('Category not found');
            }
            product.category = category._id as ObjectId;

            const newProduct = await this.productModel.create(product);

            console.log('Creating Stripe product');
            const productId = await stripeService.createProduct(
                newProduct.name,
                newProduct.description,
                [product.image] // Pass the valid image URL here
            );
            newProduct.stripeProductId = productId;

            const currency = 'USD';
            console.log('Creating Stripe price');
            const price = await stripeService.createPrice(productId, currency, newProduct.price * 100);
            newProduct.stripePriceId = price;

            await newProduct.save();
            console.log('New product created:', newProduct);
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async getProductById(id: string) {
        const product = await this.productModel.findById(id);
        return product;
    }

    async getAllProducts() {
        const products = await this.productModel.find();
        const response: any[] = JSON.parse(JSON.stringify(products));
        const categories = await categoryService.getAllCategories() as { _id: ObjectId; name: string }[];   
        const categoriesMap = new Map<string, string>(categories.map((category) => [category._id.toString(), category.name]));
        response.forEach((product) => {
            const categoryId = product.category?.toString();
            product.categoryName = categoriesMap.get(categoryId || '');
        });
        return response;
    }

    async updateProduct(id: string, product: any) {
        const productToUpdate = await this.productModel.findById(id);
        if (!productToUpdate) {
            throw new Error('Product not found');
        }
        console.log('productToUpdate', productToUpdate);
        console.log('product', product);
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, { new: true });   
        return updatedProduct;
    }

    async deleteProduct(id: string) {
        const product = await this.productModel.findById(id);
        const stripeService = new StripeService(apiKey);
        if (product && product.stripeProductId) {
            await stripeService.updateProduct(product.stripeProductId, { active: false });
        }
        await this.productModel.findByIdAndDelete(id);
        return { message: 'Product deleted successfully' };
    }

    async getProductByCategory(category: mongoose.Types.ObjectId) {
        // const categoryId = new ObjectId(category);
        const products = await this.productModel.find({ category: category });
        return products;
    }

    async getProductByFilter(filter: string) {
        const products = await this.productModel.find({ filter });
        return products;
    }
}
