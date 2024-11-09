import { Model } from "mongoose";
import { IUser } from "../models/user.models";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import client from "../config/redis";
export interface IRegisterInput {
    email: string;
    password: string;
    name: string;
}

export class AuthenticationService {
    private userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
        this.userModel = userModel;
    }

    async login(email: string, password: string): Promise<{ token: string, user: Partial<IUser> } | null> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        const userWithoutPassword = user.toObject() as Partial<IUser>;
        delete userWithoutPassword.password;
        return { token, user: userWithoutPassword };
    }

    async logout(token: string): Promise<void> {
        // Assuming there's a way to blacklist the token in a real-world scenario
        // This is a placeholder for actual implementation
        const decodedToken = verify(token, process.env.JWT_SECRET as string);
        const tokenExpired = (decodedToken as any).exp;

        client.set(token, 'blacklisted', { EX: tokenExpired - Math.floor(Date.now() / 1000) });
        console.log(`Logging out token: ${decodedToken}`);
    }

    async register(user: IRegisterInput): Promise<IUser> {
        if (!user.email || !user.password) {
            throw new Error('Email and password are required');
        }
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await hash(user.password, 10);
        const newUser = await this.userModel.create({ ...user, password: hashedPassword });
        return newUser;
    }

    async adminLogin(email: string, password: string): Promise<string | null> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            console.error('No user found');
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Invalid password');
            throw new Error('Invalid email or password');
        }
        const token = sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return token;
    }

    async adminLogout(token: string): Promise<void> {
        // Assuming there's a way to blacklist the token in a real-world scenario
        // This is a placeholder for actual implementation
        const decodedToken = verify(token, process.env.JWT_SECRET as string);
        const tokenExpired = (decodedToken as any).exp;

        client.set(token, 'blacklisted', { EX: tokenExpired - Math.floor(Date.now() / 1000) });
        console.log(`Logging out token: ${decodedToken}`);
        console.log(`Logging out token: ${token}`);
    }

    async adminRegister(user: IRegisterInput): Promise<IUser> {
        if (!user.email || !user.password) {
            throw new Error('Email and password are required');
        }
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await hash(user.password, 10);
        const newUser = await this.userModel.create({ ...user, password: hashedPassword, role: 'admin' });
        return newUser;
    }
}