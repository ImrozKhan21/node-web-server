const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use will serve the whole public directory, so if I go to localhost:3000/help.html it will render the help html file in public folder
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log');
        }
    });
    next();
});

/*app.use((req, res, next)=> {  // IT WILL ALWAYS GO TO MAINTAIN PAGE
    res.render('maintain.hbs', {
        pageTitle: 'Maintainence Page',
        welcomeMessage: 'Working.. Home'
    }); // .RENDER WILL USE VIEWS
    next();
});*/

// Helpers can be used directly in templates
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home'
    }); // .RENDER WILL USE VIEWS
});


app.get('/about', (req, res) => {
res.render('about.hbs', {
    pageTitle: 'About Page'
}); // .RENDER WILL USE VIEWS
});

app.listen(3000, () => {
    console.log("Server is up")
});