const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const usuarios = {};

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'Mi secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.json());

app.get('/', (req, res) => {
    //Si el cliente ya tiene una sesión activa, mandar a /mi_lista
    if (req.session.login) return res.redirect('/mi_lista');
    //res.sendFile('pages/index', { root: path.join(__dirname, './public') });
    res.render('pages/index');
});

app.post('/login', (req, res) => {
    //Procesar login, para guardar datos en sesión se puede usar req.session.propiedad = valor;
    let { login, password } = req.body;
    console.log(req.body);
    console.log(req.body.user);
    console.log(req.body.password);

    if (usuarios.hasOwnProperty(login)) {
        if (usuarios[login] === password) {
            req.session.login = login;
            return res.redirect('mi_lista');
        }
    }
    usuarios[login] = password;
    req.session.login = login;
    return res.redirect('mi_lista');
});

app.get('/mi_lista', (req, res) => {
    // Desplegar lista en archivo EJS
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

// server.js
// load the things we need
/*var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');*/