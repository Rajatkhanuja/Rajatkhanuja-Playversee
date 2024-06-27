import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import GameRouter from "./routes/GameRoute.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use("/api/game", GameRouter);
app.use("/images", express.static('uploads'));

// Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something broke!', error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
