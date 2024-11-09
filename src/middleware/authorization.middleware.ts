import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserModel from '../models/user.models';

declare global {
    namespace Express {
        interface Request {
            user?: any; // or specify a more precise type for user
        }
    }
}

export const authorize = (roles: string[]) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = verify(token as string, process.env.JWT_SECRET as string) as unknown as { userId: string };
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    if (!user || !roles.includes(user.role as string)) {
        res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
};
