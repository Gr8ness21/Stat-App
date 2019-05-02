const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose')

//calling all established functions in respective APIs
// const teamApi = require('./api/teamApi.js');
// const playerApi = require('./api/playerApi.js');

const teamApi = require('../api/teamApi');
const playerApi = require('../api/playerApi.js');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// tells express handlebars is rendering the page
app.set('view engine', 'hbs');

// Linking CSS
app.use('/public', express.static("public"))
// app.use('style.css', express.static("style.css"));

// const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/stat_app'
// mongoose.connect(dbConnection, { useNewUrlParser: true})
//   .then(() => {
//     console.log("mongo is working");
//   })


// Rendering home page
app.get('/', (req, res) => {
    res.render('home')
});

// connecting to the port/view
// displays when you go to local server - localhost:3000/
// app.get('/', (req, res) =>{
//     res.send('Im in this bih!');
// });

// -------------------------------
// Team Model
// -------------------------------
app.get('/teams', (req, res) => {
    teamApi.getAllTeams()
        .then(teams => {
            res.render("teams/teams", { teams });
        });
});

// Posting a new team
app.post('/teams', (req, res) => {
    teamApi.createNewTeams(req.body)
        .then(() => {
            res.render("teams/created");
        });
});

// Deleting a team
app.delete('/teams/:teamId', (req, res) => {
    teamApi.deleteTeamById(req.params.teamId)
        .then(() => {
            res.render("teams/deleted");
        });
});

// grab a single team
app.get('/teams/:teamId', (req, res) => {
    //gets team
    teamApi.getTeamById(req.params.teamId)
        .then((team) => {
            playerApi.getPlayersByTeamId(req.params.teamId)
                .then((players) => {
                    console.log(team)
                    console.log(players)
                    res.render("teams/team", { team, players });
                });
        });
});




// Updating a team
app.put('/teams/:teamId', (req, res) => {
    teamApi.updateTeamById(req.params.teamId, req.body)
        .then(() => {
            res.redirect("/teams");
        });
});

// -------------------------------
// Player Model
// -------------------------------

app.get('/players', (req, res) => {
    teamApi.getAllPlayers()
        .then(players => {
            res.render("player/player", { players });
        });
});

// Posting a new player
app.post('/player', (req, res) => {
    playerApi.createPlayer(req.body)
        .then(() => {
            res.render("player/created");
        });
});

// Deleting a Player
app.delete('/player/:playerId', (req, res) => {
    playerApi.deletePlayerById(req.params.playerId)
        .then(() => {
            res.render("player/deleted");
        });
});

// grab a single Player
app.get('/player/:playerId', (req, res) => {
    //gets player
    playerApi.getPlayerById(req.params.playerId)
        .then(player => {
            res.render("player/player", { player });
        });
});

// Updating a player
app.put('/player/:playerId', (req, res) => {
    playerApi.updatePlayerById(req.params.playerId, req.body)
        .then(() => {
            res.render("player");
        });
});

// -------------------------------
// Stats Model
// -------------------------------
app.get('/stats', (req, res) => {
    statApi.getAllStats()
        .then(stats => {
            res.render("stats/stats", { stats });
        });
});

// Posting a new stat
app.post('/stats', (req, res) => {
    teamApi.createNewStat(req.body)
        .then(() => {
            res.render("stats/created");
        });
});

// Deleting a stat
app.delete('/stats/:statId', (req, res) => {
    statApi.deleteStatById(req.params.statId)
        .then(() => {
            res.render("stats/deleted");
        });
});

// grab a single stat
app.get('/stats/:statId', (req, res) => {
    //gets stat
    teamApi.getStatById(req.params.statId)
        .then((stat) => {
            statApi.getStatsByStatId(req.params.statId)
                .then((stats) => {
                    console.log(players)
                    console.log(stats)
                    res.render("stats/stats", { players, stat });
                });
        });
});



//creating boilerplate express code
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",   () => {
    console.log("connected at:" + PORT)
});