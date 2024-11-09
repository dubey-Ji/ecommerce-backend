import { Model } from "mongoose";
import { IUser } from "../models/user.models";

export class UserService {
    private userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
        this.userModel = userModel;
    }

    async createUser(user: IUser): Promise<IUser> {
        return this.userModel.create(user);
    }

    async getUserById(id: string): Promise<IUser | null> {
        return this.userModel.findById(id);
    }

    async updateUser(id: string, user: IUser): Promise<IUser | null> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async deleteUser(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userModel.find();
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return this.userModel.findOne({ email });
    }

    async getUserByPhoneNumber(phoneNumber: number): Promise<IUser | null> {
        return this.userModel.findOne({ phoneNumber });
    }

    async getUserByAddress(address: string): Promise<IUser | null> {
        return this.userModel.findOne({ 'address.street': address });
    }

    async getUserByRole(role: string): Promise<IUser | null> {
        return this.userModel.findOne({ role });
    }

    async getUserByCreatedAt(createdAt: Date): Promise<IUser | null> {
        return this.userModel.findOne({ createdAt });
    }

    async getUserByUpdatedAt(updatedAt: Date): Promise<IUser | null> {
        return this.userModel.findOne({ updatedAt });
    }
}