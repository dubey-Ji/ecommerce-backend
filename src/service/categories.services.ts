import { Model } from 'mongoose';
import { ICategory } from '../models/categories.models';
import Category from '../models/categories.models';

export class CategoriesService {
    private categoryModel: Model<ICategory>;

    constructor() {
        this.categoryModel = Category;
    }

    async createCategory(category: ICategory) {
        const newCategory = await this.categoryModel.create(category);
        return newCategory;
    }

    async getCategoryById(id: string) {
        const category = await this.categoryModel.findById(id);
        return category;
    }

    async getAllCategories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

    async updateCategory(id: string, category: ICategory) {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
        return updatedCategory;
    }

    async deleteCategory(id: string) {
        await this.categoryModel.findByIdAndDelete(id);
    }

    async getCategoryByName(name: string) {
        const category = await this.categoryModel.findOne({ name });
        return category;
    }

    async deleteCategoryByName(name: string) {
        await this.categoryModel.findOneAndDelete({ name });
    }
}

const AdminCategoryServiceProxy = new Proxy(CategoriesService, {
    construct(target: new (...args: any[]) => any, args: any[]) {
        return new target(...args);
    }
});

// // Proxy for normal users
// const NormalUserCategoryServiceProxy = new Proxy(CategoriesService, {
//     construct(target: new (...args: any[]) => any, args: any[]) {
//         const instance = new target(...args);
//         return new Proxy(instance, {
//             get(target, prop) {
//                 if (prop === 'createCategory') {
//                     throw new Error("Permission denied: Only admin can create categories.");
//                 }
//                 return target[prop];
//             }
//         });
//     }
// });

// // Usage
// const adminCategoryService = new AdminCategoryServiceProxy(Category);
// // adminCategoryService.createCategory({ /* category data */ }); // Allowed
// const normalUserCategoryService = new NormalUserCategoryServiceProxy(Category);
// export { adminCategoryService, normalUserCategoryService }
// normalUserCategoryService.getCategoryById("someId"); // Allowed
// normalUserCategoryService.createCategory({ /* category data */ }); // This will throw an error