const mongoose = require('./connection.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Defining the shape of the player object
// Constructors have capital letters instead of camel case
const PlayerSchema = mongoose.Schema({
    name: String,
    number: Number,
    isActive: Boolean,
    userId: ObjectId
});

// API that will take the "teams" collection in mongo
let PlayerCollection = mongoose.model("Player", PlayerSchema);

function createPlayer(newPlayer, playerId){
    newPlayer.playerId = playerId;
    return PlayerCollection.create(newPlayer);
}

function getAllPlayersByPlayerId(pId) {
    return PlayerCollection.find({ playerId: pId})
}

module.exports = {
    createPlayer,
    getAllPlayersByPlayerId
};