const express = require('express');
const app = express();
const methodOverride = require('method-override');

//calling all established functions in respective APIs
const teamApi = require('./api/teamApi.js');
const playerApi = require('./api/playerApi.js');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// tells express handlebars is rendering the page
app.set('view engine', 'hbs');

// Linking CSS
app.use('/public', express.static("public"))
// app.use('style.css', express.static("style.css"));

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
// Team
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
// Player
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
            res.redirect("/player");
        });
});



//creating boilerplate express code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("connected at:" + PORT)
});