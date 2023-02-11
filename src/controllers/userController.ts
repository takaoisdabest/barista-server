import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import prisma from "../config/db";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!name || !email || password) {
		res.status(400);
		throw new Error("Please enter all fields");
	}

	const user = await prisma.user.create({ data: { name, email, password } });
	res.status(200).json({ user });
});
