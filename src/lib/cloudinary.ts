import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (image: string, type?: "profile" | "banner" | "thumbnail" | "item") => {
	const public_id = randomUUID();
	const size = {
		profile: { width: 75, height: 75 },
		banner: { width: 1920, height: 256 },
		thumbnail: { width: 256, height: 144 }
	};

	// Upload
	const res = await cloudinary.uploader.upload(image, { public_id, unique_filename: true });

	console.log(res);
	console.log(res.secure_url);

	// Generate item image without cropping
	if (type === "item") {
		const url = cloudinary.url(public_id);
		return url;
	}

	// Generate images with cropping
	let width: number;
	let height: number;
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

	const url = cloudinary.url(public_id, { width, height, Crop: "fill" });
	return url;
};

export default uploadImage;
