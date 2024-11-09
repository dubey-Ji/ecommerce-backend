import { Request, Response } from 'express';
import { AuthenticationService } from '../service/authentication.service';
import UserModel from '../models/user.models';
import { IRegisterInput } from '../service/authentication.service';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiReponse';
const authService = new AuthenticationService(UserModel);

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        const token = data?.token;
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 3600000 });
        const response = new ApiResponse(true, 'Login successful', data);
        res.status(200).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        const response = new ApiError(false, (error as Error).message, null);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const userInput: IRegisterInput = {
            email,
            password,
            name
        }
        const user = await authService.register(userInput);
        const response = new ApiResponse(true, 'Register successful', user);
        res.status(201).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        console.log('error', (error as Error).message);
        const response = new ApiError(false, (error as Error).message, null);
        console.log('response', response.message);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        await authService.logout(token);
        res.clearCookie('token');
        const response = new ApiResponse(true, 'Logged out successfully', null);
        res.status(200).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        const response = new ApiError(false, (error as Error).message, null);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await authService.adminLogin(email, password);
        if (!token) {
            const response = new ApiError(false, 'Invalid email or password', null);
            res.status(401).json({ message: response.message, success: response.success, data: response.data });
        }
        const tokenCookie = token ? token : '';
        res.cookie('token', tokenCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 3600000 }); // 1 hour
        res.cookie('isAdmin', true, { httpOnly: false, maxAge: 3600000 });
        const response = new ApiResponse(true, 'Login successful', { token, isAdmin: true });
        res.status(200).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        const response = new ApiError(false, (error as Error).message, null);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}

export const adminLogout = async (req: Request, res: Response) => {
    try {
        console.log("req.cookies", req.cookies);
        const token = req.cookies.token;
        await authService.adminLogout(token);
        res.clearCookie('token');
        res.clearCookie('isAdmin');
        const response = new ApiResponse(true, 'Logged out successfully', null);
        res.status(200).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        const response = new ApiError(false, (error as Error).message, null);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}

export const adminRegister = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const userInput: IRegisterInput = {
            email,
            password,
            name
        }
        const user = await authService.adminRegister(userInput);
        const response = new ApiResponse(true, 'Register successful', user);
        res.status(201).json({ message: response.message, success: response.success, data: response.data });
    } catch (error) {
        const response = new ApiError(false, (error as Error).message, null);
        res.status(500).json({ message: response.message, success: response.success, data: response.data });
    }
}
