import { Router, Request, Response } from "express";
import { createReview, getReviewsByProductId } from "../controllers/reviews.controller";
import { authenticate } from "../middleware/authentication.middleware";
import ApiResponse from "../utils/ApiReponse";

const router = Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    const review = await createReview(req, res);
    const response = new ApiResponse(true, 'Review created successfully', review);
    res.status(201).json(response);
});
router.get('/:productId', async (req: Request, res: Response) => {
    const reviews = await getReviewsByProductId(req, res);
    const response = new ApiResponse(true, 'Reviews fetched successfully', reviews);
    res.status(200).json(response);
});

export default router;