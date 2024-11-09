import { Request, Response } from "express";
import Review from "../models/reviews.models";
import Product from "../models/product.models";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await Review.create({ productId, userId, rating, comment });
    await Product.findByIdAndUpdate(productId, { $push: { rating: { userId, rating, comment } } });
    // res.status(201).json(review);
    return review;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
  try {
    console.log('inside getReviewsByProductId');
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    console.log('reviews', reviews);
    // res.status(200).json(reviews);
    return reviews;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
};
