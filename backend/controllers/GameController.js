import GameModel from '../models/GameModel.js';
import fs from 'fs';

const addGame = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file ? req.file.filename : '';

        const newGame = new GameModel({
            name,
            description,
            price,
            category,
            image: image_filename
        });
    
        await newGame.save();
    
        res.status(201).json({ success: true, message: 'Game added successfully', game: newGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add game', error: error.message });
    }
};

const listGames = async (req, res) => {
    try {
        const games = await GameModel.find();
        res.status(200).json({ success: true, message: 'Games listed successfully', games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to list games', error: error.message });
    }
}

const removeGame = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({ success: false, message: 'Game ID is required' });
        }

        const game = await GameModel.findById(req.body.id);
        if (!game) {
            return res.status(404).json({ success: false, message: 'Game not found' });
        }
    
        fs.unlink(`uploads/${game.image}`, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.error(err);
            }
          });
    
        await GameModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Game Data is deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to remove game", error: error.message });
    }      
}

export { addGame, listGames, removeGame };
