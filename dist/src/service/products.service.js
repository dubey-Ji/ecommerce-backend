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
exports.ProductsService = void 0;
const stripe_services_1 = require("./stripe.services");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const categories_services_1 = require("./categories.services");
const apiKey = process.env.STRIPE_SECRET_KEY || '';
const stripeService = new stripe_services_1.StripeService(apiKey);
const categoryService = new categories_services_1.CategoriesService();
class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageUrl = '';
                if (product.image) {
                    console.log('Uploading image to Cloudinary');
                    const uploadResult = yield cloudinary_1.default.uploader.upload(product.image);
                    imageUrl = uploadResult.secure_url;
                    product.image = imageUrl;
                }
                else {
                    console.log('No image provided, using default');
                    imageUrl = 'https://www.imagineonline.store/cdn/shop/files/iPhone_16_Plus_Teal_PDP_Image_Position_1__en-IN_ba0c035a-8e15-420d-a47b-a26813fa2133.jpg?v=1727248656'; // Replace with your default image URL
                    product.image = imageUrl;
                }
                const category = yield categoryService.getCategoryByName(product.categoryName);
                if (!category) {
                    throw new Error('Category not found');
                }
                product.category = category._id;
                const newProduct = yield this.productModel.create(product);
                console.log('Creating Stripe product');
                const productId = yield stripeService.createProduct(newProduct.name, newProduct.description, [imageUrl] // Pass the valid image URL here
                );
                newProduct.stripeProductId = productId;
                const currency = 'USD';
                console.log('Creating Stripe price');
                const price = yield stripeService.createPrice(productId, currency, newProduct.price * 100);
                newProduct.stripePriceId = price;
                yield newProduct.save();
                console.log('New product created:', newProduct);
                return newProduct;
            }
            catch (error) {
                console.error('Error creating product:', error);
                throw error;
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById(id);
            return product;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find();
            return products;
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productModel.findByIdAndUpdate(id, product, { new: true });
            return updatedProduct;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById(id);
            const stripeService = new stripe_services_1.StripeService(apiKey);
            if (product && product.stripeProductId) {
                yield stripeService.deleteProduct(product.stripeProductId);
            }
            yield this.productModel.findByIdAndDelete(id);
        });
    }
    getProductByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find({ category });
            return products;
        });
    }
    getProductByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find({ filter });
            return products;
        });
    }
}
exports.ProductsService = ProductsService;
