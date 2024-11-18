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
    
    async createCheckoutSession(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]): Promise<string | null> {
        const session = await this.stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            return_url: `${process.env.REACT_ORIGIN}/order-fulfilment/2?session_id={CHECKOUT_SESSION_ID}`
        });
        return session.client_secret || null;
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

    async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        return session || null;
    }
}
