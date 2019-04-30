const express = require('express');
const app = express();
const methodOverride = require('method-override');

//calling all established functions in respective APIs
const teamApi = require('./api/teamApi.js');
const playerApi = require('./api/playerApi.js');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// tells express handlebars is rendering the page
app.set('view engine', 'hbs');

// connecting to the port/view
// displays when you go to local server - localhost:3000/
// app.get('/', (req, res) =>{
//     res.send('Im in this bih!');
// });

app.get('/teams', (req, res) =>{
    teamApi.getAllTeams()
    .then(teams => {
        res.render("teams/teams", { teams});
    });
});

app.post('/teams', (req, res) =>{
    teamApi.createNewTeams(req.body)
    .then(() =>{
        res.render("teams/created");
    });
});

//creating boilerplate express code
const PORT = 3000;
app.listen(PORT, () => {
    console.log("connected at:" + PORT)
});