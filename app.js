const express = require('express');
const app = express();

//json reader
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port config
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server in port: ${PORT}`);
})

//security env
require('dotenv').config()

//Database conection
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sy7xt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Conected with DataBase'))
.catch(err => console.log('Conection error', err))


//View Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Web routes
app.use('/', require('./Routers/WebRoute.js'));
app.use('/pets', require('./Routers/Pets.js'));

app.use((req, res, next) => {
    res.status(404).render("404", {title: "This page doesn't exist"})
})
