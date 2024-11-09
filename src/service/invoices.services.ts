import { IInvoice } from "../models/invoices.models";
import { Model } from "mongoose";

export class InvoiceService {
    private invoiceModel: Model<IInvoice>;

    constructor(invoiceModel: Model<IInvoice>) {
        this.invoiceModel = invoiceModel;
    }

    async createInvoice(invoice: IInvoice): Promise<IInvoice> {
        const newInvoice = await this.invoiceModel.create(invoice);
        return newInvoice;
    }

    async getInvoiceById(id: string): Promise<IInvoice | null> {
        const invoice = await this.invoiceModel.findById(id);
        return invoice;
    }

    async getAllInvoices(): Promise<IInvoice[]> {
        const invoices = await this.invoiceModel.find();
        return invoices;
    }

    async updateInvoice(id: string, invoice: IInvoice): Promise<IInvoice | null> {
        const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, invoice, { new: true });
        return updatedInvoice;
    }

    async deleteInvoice(id: string): Promise<void> {
        await this.invoiceModel.findByIdAndDelete(id);
    }

    async getInvoicesByUserId(userId: string): Promise<IInvoice[]> {
        const invoices = await this.invoiceModel.find({ userId });
        return invoices;
    }
}
