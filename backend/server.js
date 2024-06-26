import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import GameRouter from "./routes/GameRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/game", GameRouter);
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
