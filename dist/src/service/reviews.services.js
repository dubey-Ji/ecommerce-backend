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
exports.ReviewService = void 0;
const reviews_models_1 = __importDefault(require("../models/reviews.models"));
class ReviewService {
    constructor() {
        this.reviewModel = reviews_models_1.default;
    }
    createReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = yield this.reviewModel.create(review);
            return newReview;
        });
    }
    getReviewsByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewModel.find({ productId });
            return reviews;
        });
    }
    getReviewsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewModel.find({ userId });
            return reviews;
        });
    }
    updateReview(reviewId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedReview = yield this.reviewModel.findByIdAndUpdate(reviewId, review, { new: true });
            return updatedReview;
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reviewModel.findByIdAndDelete(reviewId);
        });
    }
    getAverageRatingByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewModel.find({ productId });
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            return averageRating;
        });
    }
    getRecentReviews(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const recentReviews = yield this.reviewModel.find().sort({ createdAt: -1 }).limit(limit);
            return recentReviews;
        });
    }
    getReviewsByRating(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewModel.find({ rating });
            return reviews;
        });
    }
    getReviewsByUserIdAndProductId(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewModel.find({ userId, productId });
            return reviews;
        });
    }
}
exports.ReviewService = ReviewService;
