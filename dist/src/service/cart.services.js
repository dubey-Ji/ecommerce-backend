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
exports.CartService = void 0;
class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    createCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = yield this.cartModel.create(cart);
            return newCart;
        });
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartModel.findOne({ userId });
            return cart;
        });
    }
    updateCart(userId, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCart = yield this.cartModel.findOneAndUpdate({ userId }, cart, { new: true });
            return updatedCart;
        });
    }
    deleteCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cartModel.findOneAndDelete({ userId });
        });
    }
    addToCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartModel.findOne({ userId });
            if (!cart) {
                return null;
            }
            const existingItem = cart.items.find((item) => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity });
            }
            return this.cartModel.findByIdAndUpdate(cart._id, cart, { new: true });
        });
    }
    removeFromCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartModel.findOne({ userId });
            if (!cart) {
                return null;
            }
            const existingItem = cart.items.find((item) => item.productId === productId);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    cart.items = cart.items.filter((item) => item.productId !== productId);
                }
            }
            return this.cartModel.findByIdAndUpdate(cart._id, cart, { new: true });
        });
    }
    getCartItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartModel.findOne({ userId });
            return (cart === null || cart === void 0 ? void 0 : cart.items) || [];
        });
    }
}
exports.CartService = CartService;
