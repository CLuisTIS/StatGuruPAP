const srcLocation = require('../../srcLocation');

const path = require('path');
const express = require('express');

const router = express.Router();

const userAuthentication = require("../userAuthentication");

router.use('/files', require('./fileRouter'));

router.use('/api', require('./apiRouter'));



router.get('/',(req, res) =>{
    res.sendFile(path.join(srcLocation, './view/html/home.html'));
}); 

router.get('/aboutus', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/html/aboutus.html'));
});

router.get('/control', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/html/controlo.html'));
});

router.get('/news', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/html/news.html'));
});

router.get('/loginsignup', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/html/loginsignup.html'));
});

module.exports = router