const srcLocation = require('../../srcLocation');

const path = require('path');
const express = require('express');

const router = express.Router();

router.use('/files', require('./fileRouter'));

router.use('/api', require('./apiRouter'));



router.get('/', (req, res) => {
    res.sendFile(path.join(srcLocation, './view/html/home.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.join(srcLocation, './view/html/home1.html'));
});

router.get('/Sobrenos', function (req, res) {
    res.sendFile(path.join(srcLocation, './view/html/aboutus.html'));
});

router.get('/Administracao', function (req, res) {
    res.sendFile(path.join(srcLocation, './view/html/controlo.html'));
});

router.get('/Artigos', function (req, res) {
    res.sendFile(path.join(srcLocation, './view/html/news.html'));
});

router.get('/Loginsignup', function (req, res) {
    res.sendFile(path.join(srcLocation, './view/html/loginsignup.html'));
});

module.exports = router