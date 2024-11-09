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
exports.adminRegister = exports.adminLogout = exports.adminLogin = exports.logout = exports.register = exports.login = void 0;
const authentication_service_1 = require("../service/authentication.service");
const user_models_1 = __importDefault(require("../models/user.models"));
const authService = new authentication_service_1.AuthenticationService(user_models_1.default);
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield authService.login(email, password);
        res.cookie('token', token);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const userInput = {
            email,
            password,
            name
        };
        const user = yield authService.register(userInput);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        yield authService.logout(token);
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.logout = logout;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield authService.adminLogin(email, password);
        res.cookie('token', token);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.adminLogin = adminLogin;
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        yield authService.adminLogout(token);
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.adminLogout = adminLogout;
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const userInput = {
            email,
            password,
            name
        };
        const user = yield authService.adminRegister(userInput);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.adminRegister = adminRegister;
