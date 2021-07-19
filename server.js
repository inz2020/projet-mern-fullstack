const express = require('express');
require('dotenv').config({ path: './config/.env' })
require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
mongoose.set('useFindAndModify', false);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const { checkUser, requireAuth } = require('./middlewares/auth.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//creation de variable contenant tout ce qu'on accepte
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'prefLightContinue': false


}

//Autorisation de tous les sites d'acceder à nos urls=>notre data est disponible de n'importe qui dans le monde sans ajouter la propriété "origin".
//Ainsi, on peu préciser ce qui ont accès en utilisant cette proprièté
app.use(cors(corsOptions));

//Conversion des body en json (middleware)
app.use(cookieParser());

//Utliser de JWT. On utilise la fonction middlware checkUser pour n'importe quelle route ayant un token
app.get('*', checkUser);
//On connecte automatiquement le user à son token en courant
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)

});

//Les middlewares qui doivent passer
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);




















app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})