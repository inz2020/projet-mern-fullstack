const jwt= require('jsonwebtoken');
const userModel = require('../models/user.model');
const usermodel= require('../models/user.model');


//A chaque fois qu'on demande, on va tester si l'user
module.exports.checkUser=(req, res, next)=>{
    const token= req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET,
            async (err, decodedToken)=>{
                if(err){
                    res.locals.user= null;
                    res.cookie('jwt', '', {maxAge:1});
                    next();
                }
                else{
                    let user= await userModel.findById(decodedToken.id);
                    res.locals.user= user;
                    console.log(res.locals.user);
                    next();
                }
            })
         }

         else{
             res.locals.user=null;
             next();
         }
}

module.exports.requireAuth= (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token ,
            process.env.TOKEN_SECRET,
            async(err, decodedToken) =>{
                if(err){
                    console.log(err);
                    //Ici on ne fait pas de next, juste loguer l'errer qui nous interresse ici
                }
                else{
                    console.log(decodedToken.id);
                    next();
                }
            });

    }
    else{
        console.log("No token");
    }
}
