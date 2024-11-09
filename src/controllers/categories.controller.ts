import { Request, Response } from 'express';
import { CategoriesService } from '../service/categories.services';
import ApiResponse from '../utils/ApiReponse';
import ApiError from '../utils/ApiError';

const categoriesService = new CategoriesService();

export const createCategory = async (req: Request, res: Response) => {
    const category = await categoriesService.createCategory(req.body);
    res.status(201).json(category);
};

export const getCategoryById = async (req: Request, res: Response) => {
    const category = await categoriesService.getCategoryById(req.params.id);
    res.status(200).json(category);
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoriesService.getAllCategories();
        const apiResponse = new ApiResponse(true, 'Categories fetched successfully', categories);
        res.status(200).json(apiResponse);
    } catch (error) {
        const apiResponse = new ApiResponse(false, 'Categories fetched failed', error);
        res.status(500).json(apiResponse);
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const category = await categoriesService.updateCategory(req.params.id, req.body);
    res.status(200).json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
    await categoriesService.deleteCategory(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
};