const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');


//Creation de notre clé secrete generé à partir de l'id du user de mon TOKEN_SECRET que j'ai defini dans .env
//3 jours d'expriration
const maxAge = 24 * 60 * 60 * 3 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
};


//Creation de compte
module.exports.signUp = async(req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body

    try {
        const user = await userModel.create({ pseudo, email, password });

        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async(req, res) => {

    const { email, password } = req.body
    try {

        const user = await userModel.login(email, password);
        const token = createToken(user._id)
            //Creation d'un cookie nommé jwt et on passe ce jeton jwt dans nos cookies
        res.cookie('jwt', token, { httpOnly: true, maxAge });

        //Afficher l'id de cet user dans le body de la reponse
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }

}

//Deconnexion de l'user
module.exports.logout = async(req, res) => {
    //On retire le token ou le cookie associé precedement à cet user
    res.cookie('jwt', '', { maxAge: 1 });
    //Puis on le redirige vers
    res.redirect('/');

}


/* module.exports.listeUsers= async(req, res)=>{
    console.log(req.body);
    userModel.find((err,users)=>{
        if(err) res.status(404).send("Interne Error: "+ err);
        else res.send(users);
    });
} */