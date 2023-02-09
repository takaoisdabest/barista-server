import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
	console.log(`⚡[SERVER]: Server running on http://localhost:${PORT}`);
});
