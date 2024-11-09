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
exports.InvoiceService = void 0;
class InvoiceService {
    constructor(invoiceModel) {
        this.invoiceModel = invoiceModel;
    }
    createInvoice(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInvoice = yield this.invoiceModel.create(invoice);
            return newInvoice;
        });
    }
    getInvoiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield this.invoiceModel.findById(id);
            return invoice;
        });
    }
    getAllInvoices() {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield this.invoiceModel.find();
            return invoices;
        });
    }
    updateInvoice(id, invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedInvoice = yield this.invoiceModel.findByIdAndUpdate(id, invoice, { new: true });
            return updatedInvoice;
        });
    }
    deleteInvoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.invoiceModel.findByIdAndDelete(id);
        });
    }
    getInvoicesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield this.invoiceModel.find({ userId });
            return invoices;
        });
    }
}
exports.InvoiceService = InvoiceService;
