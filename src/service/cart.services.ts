import mongoose, { Model } from "mongoose";
import { ICart, ICartItem } from "../models/cart.models";
// import Cart from "../models/cart.models";
// import mongoose, from "mongoose";

export class CartService {
    // private cartModel = Cart;
    private cartModel: Model<ICart>;

    constructor(cartModel: Model<ICart>) {
        this.cartModel = cartModel;
    }

    async createCart(cart: ICart): Promise<ICart> {
        const newCart = await this.cartModel.create(cart);
        return newCart;
    }

    async getCartByUserId(userId: string): Promise<ICart | null> {
        const cart = await this.cartModel.findOne({ userId });
        return cart;
    }

    async updateCart(userId: string, cart: ICart): Promise<ICart | null> {
        const updatedCart = await this.cartModel.findOneAndUpdate({ userId }, cart, { new: true });
        return updatedCart;
    }

    async deleteCart(userId: string): Promise<void> {
        await this.cartModel.findOneAndDelete({ userId });
    }

    async addToCart(userId: string, productId: string, quantity: number): Promise<ICart | null> {
        let cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            const newCart = {
                userId,
                items: [{ productId, quantity }],
            }
            return await this.createCart(newCart as ICart);
        }
        const existingItem = cart.items.find((item) => {
            console.log('item', item);
            console.log('productId', productId);
            return item.productId.toString() === productId;
        });
        console.log('existingItem', existingItem);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        return this.cartModel.findByIdAndUpdate(cart._id, cart, { new: true });
    }

    async removeFromCart(userId: string, productId: string): Promise<ICart | null> {
        const cart = await this.cartModel.findOne({ userId });
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
    }

    async getCartItems(userId: string): Promise<ICartItem[]> {
        const cart = await this.cartModel.findOne({ userId });
        return cart?.items || [];
    }
}