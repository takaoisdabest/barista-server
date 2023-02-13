"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password, image } = req.body;
    // Validate data
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    // Upload profile image if it exists
    let profile_image = null;
    if (image) {
        profile_image = await (0, cloudinary_1.default)(image);
        if (!profile_image) {
            res.status(500);
            throw new Error("Sorry, Something went wrong");
        }
    }
    // Hash password
    const salt = bcryptjs_1.default.genSaltSync();
    const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
    // Save to database
    const user = await db_1.default.user.create({ data: { name, email, password: hashedPassword, image: profile_image } });
    res.status(200).json({ user });
});
