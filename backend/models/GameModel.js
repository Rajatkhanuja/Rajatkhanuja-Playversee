import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {type: string,required: true},
    description: {type: string,required: true},
    price: {type: string,required: true},
    image:{type: string,required: true},
    category: {type:string,required: true}
})   

const GameModel = mongoose.model.game || mongoose.model("Game", gameSchema);

export default GameModel;