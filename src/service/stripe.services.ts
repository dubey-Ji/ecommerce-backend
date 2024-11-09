import Stripe from 'stripe';

export class StripeService {
    private stripe: Stripe;

    constructor(apiKey: string) {
        this.stripe = new Stripe(apiKey);
    }

    async createPaymentIntent(amount: number): Promise<string> {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency: 'usd'
        });
        return paymentIntent.client_secret || '';
    }
    
    async createCheckoutSession(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]): Promise<string> {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        });
        return session.id;
    }

    async createSubscription(customerId: string, priceId: string): Promise<string> {
        const subscription = await this.stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }]
        });
        return subscription.id;
    }

    async createCustomer(email: string): Promise<string> {
        const customer = await this.stripe.customers.create({
            email
        });
        return customer.id;
    }

    async createPrice(productId: string, currency: string, unit_amount: number): Promise<string> {
        const price = await this.stripe.prices.create({
            product: productId,
            currency,
            unit_amount
        });
        console.log('price inside stripe', price)
        return price.id;
    }

    async createProduct(name: string, description: string, images: string[]): Promise<string> {
        const product = await this.stripe.products.create({
            name,
            description,
            images
        });
        return product.id;
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.stripe.products.del(productId);
    }

    async updateProduct(productId: string, product: any): Promise<void> {
        await this.stripe.products.update(productId, product);
    }
}