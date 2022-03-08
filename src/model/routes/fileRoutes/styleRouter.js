const srcLocation = require('../../../srcLocation');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/scripts.js',(req, res) =>{
    res.sendFile(path.join(srcLocation, './controller/scripts.js'))
});

// Rotas de CSS

router.get('/index.css',(req,res)=>{
    res.sendFile(path.join(srcLocation, './view/css/index.css'))
})
router.get('/aboutus.css',(req,res)=>{
    res.sendFile(path.join(srcLocation, './view/css/aboutus.css'))
})
router.get('/controlo.css',(req,res)=>{
    res.sendFile(path.join(srcLocation, './view/css/controlo.css'))
})

router.get('/loginsignup.css',(req,res)=>{
    res.sendFile(path.join(srcLocation, './view/css/loginsignup.css'))
})
router.get('/news.css',(req,res)=>{
    res.sendFile(path.join(srcLocation, './view/css/news.css'))
})

router.get('/particles.css', function(req, res) {
    res.sendFile(path.join(srcLocation, './view/css/particles.css'));
})

module.exports = router;