import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
	console.log(`\x1b[36m[server]: Server started at http://localhost:${PORT}\x1b[360`);
});
