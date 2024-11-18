import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserModel from '../models/user.models';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized, token missing' });
        return;
    }

    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized, token missing' });
        return;
    }
    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    // Verify the token
    let decoded: any;
    try {
        decoded = verify(token as string, process.env.JWT_SECRET as string) as unknown as { userId: string };
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized, invalid token' });
        return;
    }

    // Find the user
    if (!decoded) {
        res.status(401).json({ message: 'Unauthorized, invalid token' });
        return;
    }
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized, user not found' });
        return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};