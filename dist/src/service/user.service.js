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
exports.UserService = void 0;
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.create(user);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findById(id);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndUpdate(id, user, { new: true });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.findByIdAndDelete(id);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.find();
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ email });
        });
    }
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ phoneNumber });
        });
    }
    getUserByAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ 'address.street': address });
        });
    }
    getUserByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ role });
        });
    }
    getUserByCreatedAt(createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ createdAt });
        });
    }
    getUserByUpdatedAt(updatedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ updatedAt });
        });
    }
}
exports.UserService = UserService;
