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
const uploadImage = async (image, type) => {
    const public_id = (0, crypto_1.randomUUID)();
    const size = {
        profile: { width: 75, height: 75 },
        banner: { width: 1920, height: 256 },
        thumbnail: { width: 256, height: 144 }
    };
    // Upload
    const res = await cloudinary_1.v2.uploader.upload(image, { public_id, unique_filename: true });
    if (!res) {
        return null;
    }
    // Generate item image without cropping
    if (type === "item") {
        const url = cloudinary_1.v2.url(public_id);
        return url;
    }
    // Generate images with cropping
    let width;
    let height;
    switch (type) {
        case "profile":
            width = size.profile.width;
            height = size.profile.height;
            break;
        case "banner":
            width = size.banner.width;
            height = size.banner.height;
            break;
        case "thumbnail":
            width = size.thumbnail.width;
            height = size.thumbnail.height;
            break;
        default:
            width = size.profile.width;
            height = size.profile.height;
            break;
    }
    const url = cloudinary_1.v2.url(public_id, { width, height, crop: "fill" });
    return url;
};
exports.default = uploadImage;
