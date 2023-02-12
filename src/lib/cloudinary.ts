import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (image: string) => {
	const public_id = randomUUID();

	// Upload
	const res = await cloudinary.uploader.upload(image, { public_id, unique_filename: true });

	console.log(res);
	console.log(res.secure_url);

	// Generate
	return cloudinary.url(public_id, {
		width: 75,
		height: 75,
		Crop: "fill"
	});
};

export default uploadImage;
