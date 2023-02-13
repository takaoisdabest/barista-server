import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import prisma from "../config/db";
import uploadImage from "../lib/cloudinary";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, image } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please enter all fields");
	}

	let profile_image = null;
	if (image) {
		profile_image = await uploadImage(image);
		if (profile_image) {
			res.status(500);
			throw new Error("Sorry, Something went wrong");
		}
	}

	const user = await prisma.user.create({ data: { name, email, password, image: profile_image } });
	res.status(200).json({ user });
});
