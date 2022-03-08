const srcLocation = require('../../../srcLocation');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/scripts.js',(req, res) =>{
    res.sendFile(path.join(srcLocation, './controller/scripts.js'))
});

                // Imagens 
router.get('/BundesligaLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/Bundesliga.png'))
});

router.get('/LaLigaLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/LaLigaLogo.png'))
});

router.get('/SerieALogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/SerieAlogo.png'))
});

router.get('/PremierLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/premierlogo.png'))
});

router.get('/Ligue1Logo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/ligue1logo1.png'))
});

router.get('/PortugalLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/portugalligalogo.png'))
});

router.get('/StatGuruLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/statgurulogo.png'))
});

router.get('/StatGuruStatsLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/statisticslogo.png'))
});

router.get('/StatGuruLiveLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/livescoreslogo.png'))
});

router.get('/fotoeu', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/fotoeu.jpg'))
});

module.exports = router;