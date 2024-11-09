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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post('/', authentication_middleware_1.authenticate, (0, authorization_middleware_1.authorize)(['admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_controller_1.createProduct)(req, res);
    res.status(201).json(product);
    return;
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_controller_1.getProductById)(req, res);
    res.status(200).json(product);
    return;
}));
router.put('/:id', authentication_middleware_1.authenticate, (0, authorization_middleware_1.authorize)(['admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_controller_1.updateProduct)(req, res);
    res.status(200).json(product);
    return;
}));
router.delete('/:id', authentication_middleware_1.authenticate, (0, authorization_middleware_1.authorize)(['admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, product_controller_1.deleteProduct)(req, res);
    res.status(200).json({ message: 'Product deleted successfully' });
    return;
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_controller_1.getAllProducts)(req, res);
    res.status(200).json(products);
    return;
}));
router.get('/category/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_controller_1.getProductByCategory)(req, res);
    res.status(200).json(products);
    return;
}));
router.get('/filter/:filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_controller_1.getProductByFilter)(req, res);
    res.status(200).json(products);
    return;
}));
exports.default = router;
