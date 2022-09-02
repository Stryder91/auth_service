import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	// !req.session || !req.session.jwt 
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT!
		) as UserPayload;
		req.currentUser = payload;
	} catch (error) {}

	next();
}