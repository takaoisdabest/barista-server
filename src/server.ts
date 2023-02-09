import express from "express";
import * as dotenv from "dotenv";

// Routes
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use("/api/users", userRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
	console.log(`\x1b[36m[server]: Server started at http://localhost:${PORT}\x1b[360`);
});
