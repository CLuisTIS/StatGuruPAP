require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const dbConnection = require("./dbconnection");
const bcryptjs = require('bcryptjs');


app.options('', cors());
app.use((req, res, callback) => {
res.header('Access-Control-Allow-Origin', '');
res.header('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language, Location');
res.header('Access-Control-Expose-Headers', 'Authorization, Language, Location');
    return callback();
})

app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: false}));

app.use('/',require('./routes/mainRouter'));

app.listen(3000, () =>{
    console.log('Server Running!')
})