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
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeService {
    constructor(apiKey) {
        this.stripe = new stripe_1.default(apiKey);
    }
    createPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentIntent = yield this.stripe.paymentIntents.create({
                amount,
                currency: 'usd'
            });
            return paymentIntent.client_secret || '';
        });
    }
    createCheckoutSession(lineItems) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel'
            });
            return session.id;
        });
    }
    createSubscription(customerId, priceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }]
            });
            return subscription.id;
        });
    }
    createCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.stripe.customers.create({
                email
            });
            return customer.id;
        });
    }
    createPrice(productId, currency, unit_amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield this.stripe.prices.create({
                product: productId,
                currency,
                unit_amount
            });
            console.log('price inside stripe', price);
            return price.id;
        });
    }
    createProduct(name, description, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.stripe.products.create({
                name,
                description,
                images
            });
            return product.id;
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stripe.products.del(productId);
        });
    }
}
exports.StripeService = StripeService;
