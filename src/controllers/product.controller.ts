import { Request, Response } from 'express';
import ProductModel from '../models/product.models';
import { ProductsService } from '../service/products.service';
import { ReviewService } from '../service/reviews.services';
// import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary';

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File; // Add this line
        }
    }
}

const productService = new ProductsService(ProductModel);
const reviewService = new ReviewService();

export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log('inside createproduct')
        const product = await productService.createProduct(req.body);
        return product;
        // res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const addProductImage = async (req: Request, res: Response) => {
    try {
        // const product = await productService.addProductImage(req.params.id, req.body);
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await cloudinary.uploader.upload(file.path);
        return result;
        // res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const reviews = await reviewService.getReviewsByProductId(product._id as mongoose.Schema.Types.ObjectId);
        product.reviews = reviews;
        return product;
        // res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        console.log('req', req.body);
        console.log('req.params', req.params);
        const product = await productService.updateProduct(req.params.id, req.body);
        return product;
        // res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await productService.deleteProduct(req.params.id);
        return { message: 'Product deleted successfully' };
        // res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        return products;
        // res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        console.log('req.params', req.params);
        const categoryId = new mongoose.Types.ObjectId(req.params.category);
        const products = await productService.getProductByCategory(categoryId);
        return products;
        // res.status(200).json(products);
    } catch (error) {
        console.log('error', error);
        // res.status(500).json({ message: (error as Error).message });
        throw error;
    }
}

export const getProductByFilter = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProductByFilter(req.params.filter);
        return products;
        // res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}



