"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const crypto_1 = require("crypto");
// Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImage = async (image) => {
    const public_id = (0, crypto_1.randomUUID)();
    // Upload
    const res = await cloudinary_1.v2.uploader.upload(image, { public_id, unique_filename: true });
    console.log(res);
    console.log(res.secure_url);
    // Generate
    return cloudinary_1.v2.url(public_id, {
        width: 75,
        height: 75,
        Crop: "fill"
    });
};
exports.default = uploadImage;
