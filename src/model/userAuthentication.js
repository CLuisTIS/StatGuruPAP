const connection = require('./dbconnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.getLevel = (req,res) => {
    if(!req.headers.authorization) res.status(406).json({
        "msg":"Não autorizado"
    })
    try {
        connection.query(
            'SELECT * FROM user WHERE public_key = ?',
            [jwt.decode(req.headers.authorization).pk],
            (error,result) => {
                if (error) throw error;
                if(!result) res.status(401).json({
                   "msg":'Utlizador não encontrado'
                });

                jwt.verify(req.headers.authorization,result[0].private_key, (error)=>{
                    if(error) res.status(401).json({
                        "msg":"Token inválido"
                    });
                    else{
                        res.status(200).json({
                            "msg":"Sessao valida",
                            "level": result[0].level});
                    }
                })
            }
        )
    }
    catch(error){
        res.status(401).json();
    }
}

exports.login = (req,res) => {
    try {
        connection.query(
            'SELECT * FROM user WHERE email = ?',
            [req.body.email],
            (err,result)=>{
                if(err) throw err
                
                if(!result[0] || !bcrypt.compareSync(req.body.password, result[0].password)){
                    res.status(406).json({
                        msg:'Email ou password incorreta'
                    })
                }
                else {
                    let payload = {
                        pk : result[0].public_key
                    } 
                    let options = {
                        expiresIn: 3600,
                        issuer: 'StatGuru'
                    }
                    let token = jwt.sign(payload, result[0].private_key,options)

                    
                    res.header('Authorization',token).json({
                        msg:"logado com sucesso"
                    })
                }
            }
        )
    }
    catch(err){
        res.json({
            msg:'erro...'
        })
    }
}

exports.checkAuthAdmin = (req, res, callback) => {

    if(!req.headers.authorization) res.status(406).json({msg:"Não autorizado"})
    try {
        connection.query(
            'SELECT * FROM user WHERE public_key = ?',
            [jwt.decode(req.headers.authorization).pk],
            (error,result) => {
                if (error) throw error;
                if(!result) res.status(401).json({msg:'Utlizador não encontrado'});

                jwt.verify(req.headers.authorization,result[0].private_key, (error)=>{
                    if(error) res.status(401).json('Token inválido');
                        if(result[0].level == 'admin'){
                            req.user = result[0];
                            return callback();
                        }
                        res.status(406).json({msg:"Não autorizado"})
                })
            }
        )
    }
    catch(error){
        res.status(401).json({msg:'Não autorizado'})
    }
}
exports.checkAuthRegular = (req, res, callback) => {

    if(!req.headers.authorization) res.status(406).json({msg:"Não autorizado"})
    try {
        connection.query(
            'SELECT * FROM user WHERE public_key = ?',
            [jwt.decode(req.headers.authorization).pk],
            (error,result) => {
                if (error) throw error;
                if(!result) res.status(401).json({msg:'Utlizador não encontrado'});

                jwt.verify(req.headers.authorization,result[0].private_key, (error)=>{
                    if(error) res.status(401).json('Token inválido');
                        if(result[0].level == 'regular'){
                            req.user = result[0];
                            return callback();
                        }
                        res.status(406).json({msg:"Não autorizado"})
                })
            }
        )
    }
    catch(error){
        res.status(401).json({msg:'Não autorizado'})
    }
}