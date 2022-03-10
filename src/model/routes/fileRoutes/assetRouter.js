const srcLocation = require('../../../srcLocation');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/scripts.js',(req, res) =>{
    res.sendFile(path.join(srcLocation, './controller/scripts.js'))
});

router.get('/StatGuruLogo', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/assets/statgurulogo.png'))
});


module.exports = router;