const mongoose = require('./connection.js')

//when defining constructors capital first letters will be used.
//defining the entities

const TeamSchema = mongoose.Schema({
    name: String
});

//creating an API that will take the "teams" collection in mongodb
let TeamCollection = mongoose.model("Team", TeamSchema);

// Fuction to get all Teams
function getAllTeams() {
    //using mongoose to get all teams
    return TeamCollection.find();
}

// Function to create new teams
function createNewTeams(newTeamData){
    return TeamCollection.create(newTeamData);
}

// Function to get team by Id
function getTeamById(teamId) {
    return TeamCollection.findById(teamId);
}

// Function to delete team by Id
function deleteTeamById(teamId) {
    return TeamCollection.deleteOne({ _id: teamId });
}

// // Function to update Team
// function updateTeamById(teamId, team) {
//     return TeamCollection.updateOne({ _id: teamId }, team);
//     //possible bug: not sure if it works
// }

// calls all established functions to be exported
module.exports = {
    getAllTeams,
    createNewTeams,
    getTeamById,
    deleteTeamById
    // updateTeamById
};