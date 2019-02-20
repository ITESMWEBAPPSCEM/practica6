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

app.get('/', (req, res) => {
    //Si el cliente ya tiene una sesión activa, mandar a /mi_lista
    if (req.session.login) return res.redirect('/mi_lista');
    res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

app.post('/login', (req, res) => {
    //Procesar login, para guardar datos en sesión se puede usar req.session.propiedad = valor;
    let { login, password } = req.body;
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));