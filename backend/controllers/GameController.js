import GameModel from '../models/GameModel.js';

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

export { addGame };
