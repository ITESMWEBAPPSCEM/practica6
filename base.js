const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const redirect = require("express-redirect");

const usuarios = {
};

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
redirect(app);

app.get('/', (req, res) => {
    //Si el cliente ya tiene una sesión activa, mandar a /mi_lista
    if (req.session.login) return res.redirect('pages/mi_lista');
    //res.sendFile('pages/index', { root: path.join(__dirname, './public') });
    res.render('pages/index');
});

app.post('/login', (req, res) => {
    //Procesar login, para guardar datos en sesión se puede usar req.session.propiedad = valor;
    let { login, password } = req.body;
    
    if (usuarios.hasOwnProperty(login)) {
        console.log('dentro de if has Own Property');
        if (usuarios[login] === password) {
            req.session.login = login;
            return res.render('pages/mi_lista');
        }
    }
    console.log('else');
    usuarios[login] = password;
    req.session.login = login;
    return res.redirect(401,'pages/index');
});

app.post('/login', (req, res) => {
    //Procesar login, para guardar datos en sesión se puede usar req.session.propiedad = valor;
    
    
    if (usuarios.hasOwnProperty(login)) {
        console.log('dentro de if has Own Property');
        if (usuarios[login] === password) {
            console.log('dentro de password');
            req.session.login = login;
            return res.render('pages/mi_lista');
        }
    }
    console.log('else');
    usuarios[login] = password;
    req.session.login = login;
    return res.redirect(401,'pages/index');
});

app.post('/save', (req, res) => {
    // Desplegar lista en archivo EJS
    let user = req.body.user;
    var list = req.body.list;

    console.log(user);
    console.log(req.body.list);
    console.log('usuarios');
    console.log(usuarios);
    if (usuarios.hasOwnProperty(user)) {
        usuarios[list] = list;
        
        return res.send({status:true, msj:'exito', data:usuarios});

    }else{

        return res.status(404).send({status:false,msj:'no se encontro el usuario'});

    }
});

app.get('/getList', (req,res) => {

    return res.send({status:true, msj:'exito', data:usuarios});

});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
