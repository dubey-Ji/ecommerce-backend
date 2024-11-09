"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const product_routes_1 = __importDefault(require("./product.routes"));
const router = express_1.default.Router();
router.get('/ping', (req, res) => {
    res.status(200).json({ success: false, message: "Pong" });
});
router.use('/auth', auth_router_1.default);
router.use('/product', product_routes_1.default);
exports.default = router;
