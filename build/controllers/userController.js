"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = __importDefault(require("../config/db"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    let profile_image = null;
    if (image) {
        profile_image = (0, cloudinary_1.default)(image);
    }
    const user = await db_1.default.user.create({ data: { name, email, password } });
    res.status(200).json({ user });
});
