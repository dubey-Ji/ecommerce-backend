import { Model } from "mongoose";
import Review, { IReview } from "../models/reviews.models";

export class ReviewService {
    private reviewModel: Model<IReview>;

    constructor() {
        this.reviewModel = Review;
    }

    async createReview(review: IReview): Promise<IReview> {
        const newReview = await this.reviewModel.create(review);
        return newReview;
    }

    async getReviewsByProductId(productId: IReview['productId']): Promise<IReview[]> {
        const reviews = await this.reviewModel.find({ productId });
        return reviews;
    }

    async getReviewsByUserId(userId: string): Promise<IReview[]> {
        const reviews = await this.reviewModel.find({ userId });
        return reviews;
    }

    async updateReview(reviewId: string, review: IReview): Promise<IReview | null> {
        const updatedReview = await this.reviewModel.findByIdAndUpdate(reviewId, review, { new: true });
        return updatedReview;
    }

    async deleteReview(reviewId: string): Promise<void> {
        await this.reviewModel.findByIdAndDelete(reviewId);
    }

    async getAverageRatingByProductId(productId: string): Promise<number> {
        const reviews = await this.reviewModel.find({ productId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return averageRating;
    }

    async getRecentReviews(limit: number): Promise<IReview[]> {
        const recentReviews = await this.reviewModel.find().sort({ createdAt: -1 }).limit(limit);
        return recentReviews;
    }

    async getReviewsByRating(rating: number): Promise<IReview[]> {
        const reviews = await this.reviewModel.find({ rating });
        return reviews;
    }

    async getReviewsByUserIdAndProductId(userId: string, productId: string): Promise<IReview[]> {
        const reviews = await this.reviewModel.find({ userId, productId });
        return reviews;
    }
}

