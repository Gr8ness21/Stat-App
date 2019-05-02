const mongoose = require('../database/connection.js');

//when defining constructors capital first letters will be used.
//defining the entities

const StatSchema = mongoose.Schema({
    name: String
});

//creating an API that will take the "stats" collection in mongodb
let StatCollection = mongoose.model("stats", StatSchema);

// Fuction to get all Stats
function getAllStats() {
    //using mongoose to get all Stats
    return StatCollection.find();
}

// Function to create new Stats
function createNewStat(newStatData){
    return StatCollection.create(newStatData);
}

// Function to get stat by Id
function getStatById(statId) {
    return StatCollection.findById(statId);
}

// Function to delete stat by Id
function deleteStatById(statId) {
    return StatCollection.deleteOne({ _id: statId });
}

// // Function to update Team
// function updateTeamById(teamId, team) {
//     return TeamCollection.updateOne({ _id: teamId }, team);
//     //possible bug: not sure if it works
// }

// calls all established functions to be exported
module.exports = {
    getAllStats,
    createNewStat,
    getStatById,
    deleteStatById
};