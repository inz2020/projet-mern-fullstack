const mongoose= require('mongoose');

const {isEmail}= require('validator');
const bcrypt= require('bcrypt');

const userSchema= new mongoose.Schema({
        pseudo: {
            type:String,
             required: true,
              minLength:3,
              maxLength: 60,
              unique: true,
              trim: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        validate:[isEmail],
        lowercase: true,
        trim: true
    },
    password:{
       type: String,
        required: true,
        minLength: 8,
        maxLength: 1024
        
    },
    image:{
        type: String,
        default:'./images/Im5.jpg'
    },

    bio:{
        type:String,
        minLength:3,
        maxLength: 1024
    },

    followers:{
        type:[String]

    },

    following:{
        type:[String]
    },
    likes:{
        type:[String]
    }

},  {timestamps: true});

//Crypter les passwprds avant de les mettre dans la BD
userSchema.pre("save",  async function(next){
    //c-a-d bcrypt va generer une series de code qui va saler ou crypter le password
    const salt= await bcrypt.genSalt();
//On ajouter ce code salé au mot de passe
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

//Crypter les passwords à la sortie de la BD
userSchema.statics.login= async function(email, password){
    const user= await this.findOne({email});
    if(user){
        const auth= await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password!!!');

    }
    throw Error('Incorrect Email!!!');

}

const userModel= mongoose.model("users", userSchema);
module.exports=userModel;