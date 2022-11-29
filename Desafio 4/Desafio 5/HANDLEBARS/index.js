const express = require("express");
const app = express();
const PORT = 3001;


let hbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('hbs', hbs.engine());
app.set("views", "./views/hbs");
app.set("view engine", "hbs");

let arrProductos = [];

app.get('/', (req, res, next) => {
    res.render('index', {arrProductos})
});
app.post('/productos', (req, res, next) => {
    arrProductos.push(req.body);
    res.redirect('/');
});
app.get('/productos', (req, res, next) => {
    res.render('productos', {arrProductos})
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));