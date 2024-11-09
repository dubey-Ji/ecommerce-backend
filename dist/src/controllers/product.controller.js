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
exports.getProductByFilter = exports.getProductByCategory = exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const products_service_1 = require("../service/products.service");
const reviews_services_1 = require("../service/reviews.services");
const productService = new products_service_1.ProductsService(product_models_1.default);
const reviewService = new reviews_services_1.ReviewService();
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('inside createproduct');
        const product = yield productService.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const reviews = yield reviewService.getReviewsByProductId(product._id);
        product.reviews = reviews;
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getProductByCategory(req.params.category);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductByCategory = getProductByCategory;
const getProductByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getProductByFilter(req.params.filter);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductByFilter = getProductByFilter;
