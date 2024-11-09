import { Router, Request, Response } from "express";
import WishlistController from "../controllers/wishlist.controller";
import { authenticate } from "../middleware/authentication.middleware";
const router = Router();
const wishlistController = new WishlistController();

router.post('/', authenticate, async (req: Request, res: Response) => {
    await wishlistController.createWishlist(req, res);
});
router.get('/', authenticate, async (req: Request, res: Response) => {
    await wishlistController.getWishlist(req, res);
});
// router.delete('/:id', authenticate, async (req: Request, res: Response) => {
//     await wishlistController.deleteWishlist(req, res);
// });
router.delete('/clear', authenticate, async (req: Request, res: Response) => {
    await wishlistController.clearWishlist(req, res);
});
router.delete('/:productId', authenticate, async (req: Request, res: Response) => {
    console.log('inside delete wishlist by product id and user id route');
    await wishlistController.deleteWishlistByProductIdAndUserId(req, res);
});

export default router;