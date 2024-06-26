import express from "express";
import { addGame } from "../controllers/GameController.js";
import multer from "multer";

const GameRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

GameRouter.post("/add", upload.single("image"), addGame);

export default GameRouter;
