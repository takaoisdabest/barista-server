import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "User registered" });
});
