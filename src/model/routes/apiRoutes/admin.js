
const express = require("express");
const router = express.Router();


const bcryptjs = require("bcryptjs");
const dbConnection = require("../../dbconnection");


router.get('/admins', (req, res) => {
    dbConnection.query(`SELECT iduser, email FROM user WHERE level = ?`,
        ["admin"],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(result)
            }
        })
});

router.get('/users', (req, res) => {
    dbConnection.query(`SELECT iduser, email, level FROM user`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(result)
            }
        })
});

router.get('/Sarticles', (req, res) => {
    dbConnection.query(`SELECT idArticle, title, text, imagem FROM articles`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(result)
            }
        })
});

router.post('/articles', (req, res) => {

    dbConnection.query("INSERT INTO articles (title, text, imagem) VALUES (?,?,?)",
        [req.body.title, req.body.text, req.body.imagem],
        
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(406).send("Erro na introdução")
            } else {
                res.status(200).send(result)
            }
        })
});

router.post('/newLevel', (req, res) => {
    dbConnection.query("UPDATE user SET level = 'admin' WHERE iduser= ?",
        [req.body.iduser],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(406).send("Erro na mudança de nivel!")
            } else {
                res.status(200).send(result)
            }
        })
});

router.post('/atArticle', (req, res) => {
    dbConnection.query("UPDATE articles SET title = ?, text = ?, imagem = ? WHERE idarticle = ?",
        [req.body.title,req.body.text,req.body.imagem,req.body.idarticle],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(406).send("Erro na atualização do artigo!")
            } else {
                res.status(200).send(result)
            }
        })
});

router.post('/admins', (req, res) => {
    dbConnection.query(`SELECT COUNT(user.iduser) AS contagem FROM user WHERE user.email = ?`,
        [req.body.email],
        (err, result) => {
            if (err) {
                console.log(err)
            } else
                if (result[0].contagem == 0) {
                    dbConnection.query("INSERT INTO user (email, password, level) VALUES (?,?,?)",
                        [req.body.email, bcryptjs.hashSync(escape(req.body.password, bcryptjs.genSaltSync(2))), "admin"],
                        (err, result) => {
                            if (err) {
                                console.log(err)
                                res.status(406).send("Erro na introdução")
                            } else {
                                dbConnection.query(
                                    'UPDATE user SET public_key = ?, private_key = ? WHERE iduser = ?',
                                    [Math.random().toString(36).substring(2) + result.insertId, Math.random().toString(36).substring(2) + result.insertId, result.insertId],
                                    (error, result) => {
                                        if (error) throw error
                                    })
                                res.status(200).send()
                            }
                        })
                }
                else {
                    res.status(406).send("Já existe uma conta com esse email!")
                }
        })
});



module.exports = router;