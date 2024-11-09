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
exports.AuthenticationService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const redis_1 = __importDefault(require("../config/redis"));
class AuthenticationService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email });
            if (!user) {
                return null;
            }
            const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            const token = (0, jsonwebtoken_1.sign)({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming there's a way to blacklist the token in a real-world scenario
            // This is a placeholder for actual implementation
            const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            const tokenExpired = decodedToken.exp;
            redis_1.default.set(token, 'blacklisted', { EX: tokenExpired - Math.floor(Date.now() / 1000) });
            console.log(`Logging out token: ${decodedToken}`);
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email || !user.password) {
                throw new Error('Email and password are required');
            }
            const existingUser = yield this.userModel.findOne({ email: user.email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, 10);
            const newUser = yield this.userModel.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return newUser;
        });
    }
    adminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email });
            if (!user) {
                return null;
            }
            const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            const token = (0, jsonwebtoken_1.sign)({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
    adminLogout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming there's a way to blacklist the token in a real-world scenario
            // This is a placeholder for actual implementation
            console.log(`Logging out token: ${token}`);
        });
    }
    adminRegister(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email || !user.password) {
                throw new Error('Email and password are required');
            }
            const existingUser = yield this.userModel.findOne({ email: user.email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, 10);
            const newUser = yield this.userModel.create(Object.assign(Object.assign({}, user), { password: hashedPassword, role: 'admin' }));
            return newUser;
        });
    }
}
exports.AuthenticationService = AuthenticationService;
