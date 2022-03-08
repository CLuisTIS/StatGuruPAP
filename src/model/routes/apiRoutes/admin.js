const srcLocation = require("../../../srcLocation");
const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthentication = require("../../userAuthentication");

const bcryptjs = require("bcryptjs");
const dbConnection = require("../../dbconnection");

router.get('/admins', (req,res) => {
    dbConnection.query(`SELECT iduser, username FROM user WHERE level = ?`,
    ["admin"],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result)
        }
     })
});

router.get('/users', (req,res) => {
    dbConnection.query(`SELECT iduser, username FROM user WHERE level = ?`,
    ["regular"],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result)
        }
     })
});

router.get('/articles', (req,res) => {
    dbConnection.query(`SELECT idArticle, title, text FROM articles`,
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result)
        }
    })
});

router.post('/articles', (req,res)=>{
    dbConnection.query("INSERT INTO articles (title, text) VALUES(?,?)",
    [req.body.title, req.body.text],
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(406).send("Erro na introdução")
        }else{
            res.status(200).send(result)
        }
    })
});

router.post('/admins', (req,res) => {
    dbConnection.query(`SELECT COUNT(user.iduser) AS contagem FROM user WHERE user.username = ?`,
    [req.body.username],
    (err,result)=>{
        if(err){
            console.log(err)
        }else
            if(result[0].contagem == 0){
            dbConnection.query("INSERT INTO user (username, password, level) VALUES (?,?,?)",
            [req.body.username,bcryptjs.hashSync(escape(req.body.password,bcryptjs.genSaltSync(2))),"admin"],
            (err,result)=>{
                if(err){
                    console.log(err)
                    res.status(406).send("Erro na introdução")
                }else{
                      dbConnection.query(
                        'UPDATE user SET public_key = ?, private_key = ? WHERE iduser = ?',
                        [Math.random().toString(36).substring(2) + result.insertId, Math.random().toString(36).substring(2) + result.insertId, result.insertId],
                        (error,result)=>{
                          if (error) throw error
                    })
                res.status(200).send()
                }
          })
        }
        else{
            res.status(406).send("Já existe uma conta com esse username!")
        }
    })
});

module.exports = router;