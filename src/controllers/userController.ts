import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import prisma from "../config/db";
import uploadImage from "../lib/cloudinary";
import generateToken from "../lib/generate-token";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, image } = req.body;

	// Validate data
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please enter all fields");
	}

	// Upload profile image if it exists
	let profile_image = null;
	if (image) {
		profile_image = await uploadImage(image);

		if (!profile_image) {
			res.status(500);
			throw new Error("Sorry, Something went wrong");
		}
	}

	// Hash password
	const salt = bcrypt.genSaltSync();
	const hashedPassword = bcrypt.hashSync(password, salt);

	// Save to database
	const user = await prisma.user.create({ data: { name, email, password: hashedPassword, image: profile_image } });

	res.status(200).json({
		id: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		token: generateToken(user.id)
	});
});

// @desc    Authenticat a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// Validate data
	if (!email || !password) {
		res.status(400);
		throw new Error("Please enter all fields");
	}

	// Get user from database
	const user = await prisma.user.findUnique({ where: { email: email } });

	if (!user) {
		res.status(404);
		throw new Error(`User with email '${email}' does not exist`);
	}

	// Check password
	if (!bcrypt.compareSync(password, user.password)) {
		res.status(401);
		throw new Error("Wrong password");
	}

	res.status(200).json({
		id: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		token: generateToken(user.id)
	});
});
