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
const categories_models_1 = __importDefault(require("../models/categories.models"));
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Seeding categories...');
    const categories = [
        { name: 'Electronics', description: 'Electronics category' },
        { name: 'Clothing', description: 'Clothing category' },
        { name: 'Books', description: 'Books category' },
        { name: 'Furniture', description: 'Furniture category' },
        { name: 'Toys', description: 'Toys category' },
        { name: 'Sports', description: 'Sports category' },
        { name: 'Books', description: 'Books category' },
    ];
    try {
        yield categories_models_1.default.insertMany(categories);
        console.log('Categories seeded successfully');
    }
    catch (error) {
        console.error('Error seeding categories:', error);
    }
});
