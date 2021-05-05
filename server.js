const express= require('express');
require('dotenv').config({path: './config/.env'})
require('./config/db');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const userRoutes= require('./routes/user.routes');
const postRoutes= require('./routes/post.routes');
mongoose.set('useFindAndModify', false);
const cors= require('cors');
const cookieParser= require('cookie-parser');
const app=express();

const {checkUser, requireAuth}= require('./middlewares/auth.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Conversion des body en json (middleware)
app.use(cookieParser());

//Utliser de JWT. On utilise la fonction middlware checkUser pour n'importe quelle route ayant un token
app.get('*', checkUser);
//On connecte automatiquement le user à son token en courant
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)

});

//Les middlewares qui doivent passer
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);




















app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})