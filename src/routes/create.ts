import express, {Request, Response } from 'express';
import { requireAuth, validateRequest } from '@common91120/common';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/products', 
	requireAuth, 
	[
		body('title')
			.not()
			.isEmpty()
			.withMessage('Title is required'),
		body('price')
			.isFloat({ gt: 0 })
			.withMessage('Price must be greater than 0')
	],
	validateRequest,
 	(req: Request, res: Response) => {
		res.sendStatus(200);
});

export { router as createProductRouter };