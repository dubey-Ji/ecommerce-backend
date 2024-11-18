import OrdersService from "../service/orders.services";
import { StripeService } from "../service/stripe.services";
import { ProductsService } from "../service/products.service";
import { Request, Response } from "express";
import {CartService} from "../service/cart.services";

class OrdersController {
    constructor(private ordersService: OrdersService, private stripeService: StripeService, private productService: ProductsService, private cartService: CartService) {}

    async createOrder(req: Request, res: Response) {
        const order = req.body;
        const userId = req.user?._id;
        const products = order.items;
        console.log('user', req.user);
        try {
            const newOrder = await this.ordersService.createOrder(order);
            if (newOrder) {
                console.log('products inside if neworder', products);
                for (let i = 0; i < products.length; i++) {
                    await this.cartService.deleteCartItem(userId, products[i].productId);
                }
            }
            return newOrder;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
            const orders = await this.ordersService.getOrders();
            // res.status(200).json(orders);
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getOrderById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const order = await this.ordersService.getOrderById(id);
            // res.status(200).json(order);
            return order;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = req.body;
        try {
            const updatedOrder = await this.ordersService.updateOrder(id, order);
            // res.status(200).json(updatedOrder);
            return updatedOrder;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteOrder(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.ordersService.deleteOrder(id);
            // res.status(200).json({ message: 'Order deleted successfully' });
            return { message: 'Order deleted successfully' };
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getOrdersByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        try {
            const orders = await this.ordersService.getOrdersByUserId(userId);
            // res.status(200).json(orders);
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async createCheckoutSession(req: Request, res: Response) {
        const order: {productId: string, quantity: number}[] = req.body.lineItems;
        console.log(order);
        // [{productId, quantity}]
        const productsMap = new Map<string, number>();
        for (const product of order) {
            const stripeProduct = await this.productService.getProductById(product.productId);
            if (stripeProduct && stripeProduct.stripePriceId) {
                productsMap.set(stripeProduct.stripePriceId, product.quantity);
            }
        }
        const lineItems = Array.from(productsMap.entries()).map(([priceId, quantity]) => ({
            price: priceId,
            quantity,
        }));

        const session = await this.stripeService.createCheckoutSession(lineItems);
        console.log(session);
        return {clientSecret: session};
        // const session = await this.ordersService.createCheckoutSession(productsMap);
        // return session;
    }

    async getCheckoutSession(req: Request, res: Response) {
        const sessionId = req.params.sessionId;
        const session = await this.stripeService.getCheckoutSession(sessionId);
        return session;
    }
}

export default OrdersController;