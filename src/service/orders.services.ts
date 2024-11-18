import { IOrder } from "../models/orders.models";
import OrderModel from "../models/orders.models";
class OrdersService {
    async createOrder(order: IOrder) {
        console.log('order inside service', order)
        const newOrder = await OrderModel.create(order);
        return newOrder;
    }

    async getOrders() {
        const orders = await OrderModel.find();
        return orders;
    }

    async getOrderById(id: string) {
        const order = await OrderModel.findById(id);
        return order;
    }

    async updateOrder(id: string, order: IOrder) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, order, { new: true });
        return updatedOrder;
    }

    async deleteOrder(id: string) {
        const deletedOrder = await OrderModel.findByIdAndDelete(id);
        return deletedOrder;
    }

    async getOrdersByUserId(userId: string) {
        const orders = await OrderModel.find({ userId });
        return orders;
    }
}

export default OrdersService;