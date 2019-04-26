const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// tells express handlebars is rendering the page
app.set('view engine', 'hbs');

// connecting to the port/view
// displays when you go to local server - localhost:3000/
app.get('/', (req, res) =>{
    res.send('Im in this bih!');
});

//creating boilerplate express code
const PORT = 3000;
app.listen(PORT, () => {
    console.log("connected at:" + PORT)
});