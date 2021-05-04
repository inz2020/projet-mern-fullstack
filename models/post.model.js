const mongoose= require('mongoose');
const PostSchema= new mongoose.Schema(
    {
        postId:{
            type:String,
            trim: true,
            unique:true
        },

        message:{
            type:String,
            trim: true,
            maxLength: 500
            
        },
        picture:{
            type:String
        },
        video:{
            type:String
        }
           
    }
)