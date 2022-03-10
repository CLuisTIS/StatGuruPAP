const srcLocation = require("../../../srcLocation");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthentication = require("../../userAuthentication");

const bcryptjs = require("bcryptjs");

const dbConnection = require("../../dbconnection");

router.post(`/register`,(req,res)=>{

    dbConnection.query(`SELECT COUNT(user.iduser) AS contagem FROM user WHERE user.email = ?`,
    [req.body.email],
    (err,result)=>{
        if(err){
            console.log(err)
        }else
            if(result[0].contagem == 0){
            dbConnection.query("INSERT INTO user (email, password, level) VALUES (?,?,?)",
            [req.body.email,bcryptjs.hashSync(escape(req.body.password,bcryptjs.genSaltSync(2))),"regular"],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(406).send("Erro na introdução");
                }
                else{
                      dbConnection.query(
                        'UPDATE user SET public_key = ?, private_key = ? WHERE iduser = ?',
                        [Math.random().toString(36).substring(2) + result.insertId, Math.random().toString(36).substring(2) + result.insertId, result.insertId],
                        (error,result)=>{
                          if (error) throw error
                    });
                res.status(200).send()
                };
          });
        }
        else{
            res.status(406).send("Já existe uma conta com esse email!")
        }
    })
});

router.get('/articles', (req,res) => {
    dbConnection.query(`SELECT idArticle, title, imagem, text FROM articles`,
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result)
        }
    })
});

router.post('/articles', (req,res)=>{
    dbConnection.query("INSERT INTO articles (title, text, imagem) VALUES (?,?,?)",
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


router.post("/login", userAuthentication.login)

router.post("/getAuth", userAuthentication.getLevel)

module.exports = router;