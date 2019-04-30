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

// Function to Create New players
function createPlayer(newPlayer, playerId){
    newPlayer.playerId = playerId;
    return PlayerCollection.create(newPlayer);
}

// Fuction to get all Players
function getAllPlayers() {
    //using mongoose to get all teams
    return PlayerCollection.find();
}

// Function to Get all players by Id
function getAllPlayersByPlayerId(pId) {
    return PlayerCollection.find({ playerId: pId});
}

// Function to get player by Id
function getPlayerById(playerId) {
    return PlayerCollection.findById(playerId);
}

//function to delete player by Id
function deletePlayerById(playerId) {
    return PlayerCollection.deleteOne({ _id: playerId });
}

// calls all established functions to be exported
module.exports = {
    createPlayer,
    getAllPlayers,
    getAllPlayersByPlayerId,
    getPlayerById,
    deletePlayerById
};