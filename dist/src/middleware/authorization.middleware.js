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
exports.authorize = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_models_1 = __importDefault(require("../models/user.models"));
const authorize = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    const user = yield user_models_1.default.findById(decoded.userId);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
});
exports.authorize = authorize;