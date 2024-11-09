"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalUserCategoryService = exports.adminCategoryService = exports.CategoriesService = void 0;
const categories_models_1 = __importDefault(require("../models/categories.models"));
class CategoriesService {
    constructor() {
        this.categoryModel = categories_models_1.default;
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield this.categoryModel.create(category);
            return newCategory;
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById(id);
            return category;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryModel.find();
            return categories;
        });
    }
    updateCategory(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield this.categoryModel.findByIdAndUpdate(id, category, { new: true });
            return updatedCategory;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryModel.findByIdAndDelete(id);
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findOne({ name });
            return category;
        });
    }
    deleteCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryModel.findOneAndDelete({ name });
        });
    }
}
exports.CategoriesService = CategoriesService;
const AdminCategoryServiceProxy = new Proxy(CategoriesService, {
    construct(target, args) {
        return new target(...args);
    }
});
// Proxy for normal users
const NormalUserCategoryServiceProxy = new Proxy(CategoriesService, {
    construct(target, args) {
        const instance = new target(...args);
        return new Proxy(instance, {
            get(target, prop) {
                if (prop === 'createCategory') {
                    throw new Error("Permission denied: Only admin can create categories.");
                }
                return target[prop];
            }
        });
    }
});
// Usage
const adminCategoryService = new AdminCategoryServiceProxy(categories_models_1.default);
exports.adminCategoryService = adminCategoryService;
// adminCategoryService.createCategory({ /* category data */ }); // Allowed
const normalUserCategoryService = new NormalUserCategoryServiceProxy(categories_models_1.default);
exports.normalUserCategoryService = normalUserCategoryService;
// normalUserCategoryService.getCategoryById("someId"); // Allowed
// normalUserCategoryService.createCategory({ /* category data */ }); // This will throw an error
