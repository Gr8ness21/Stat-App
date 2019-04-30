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

