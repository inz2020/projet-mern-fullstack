
const postModel= require('../models/post.model');
const userModel= require('../models/user.model');
const objectID= require('mongoose').Types.ObjectId;


//router.post('/', postController.createPost);

module.exports.createPost=async(req, res)=>{
    const newPost= new postModel(
        {
            postId: req.body.postId,
            message: req.body.message,
            video: req.body.video,
            likers:[],
            comments:[]
        }
    );
    //incrementer
    try{
        const post= await newPost.save();
        return res.status(201).json(post); 

    }
    catch(err){
        return res.status(400).send(err);

    }

}


// router.get('/',postController.readPost);
module.exports.readPost=(req ,res)=>{
    postModel.find(
        (err, docs)=>{
            if(!err) res.send(docs);
            else console.log('Error to get data!!'+ err);
        }
    );

}

//router.put('/',postController.updatePost);
module.exports.updatePost= (req,res)=>{
    //Controller si l'ID est bien passé

    if(!objectID.isValid(req.params.id)) 
    return res.status(400).send("ID Unknown: "+ req.params.id);

    const updateRecord={message:req.body.message};

    postModel.findByIdAndUpdate(
        req.params.id,
        {$set:updateRecord},
        {new:true},
        (err,docs)=>{
            if(!err) res.send(docs);
            else consle.log("Update error: "+ err);
        }
    )

}

//router.delete('/', postController.deletePost);
module.exports.deletePost=(req,res)=>{

    if(!objectID.isValid(req.params.id))
    return res.status(400).send("ID Unknown: "+ req.params.id);

    postModel.findByIdAndDelete(
        req.params.id,
        (err, docs)=>{
            if(!err) return res.send(docs);
            else console.log('Delete errr: '+ err);
        }
    );

}


//router.patch("/likePost/:id", postController.likePost);
module.exports.likePost= async(req, res)=>{
    if(!objectID.isValid(req.params.id))
    return res.status(400).send("ID Unknown: "+ req.params.id);
    
   try{
    //Ajouter l'user dans les likers du post
    await postModel.findByIdAndUpdate(
        req.params.id,
        {
            $addToSet:{likers:req.body.id}
        },
        {new:true},
        (err, docs)=>{
            if(err) return res.status(400).send(err);
        }
    );

    //Ajouter le like dans les likes du user
    await  userModel.findByIdAndUpdate(
        req.body.id,
        {
            $addToSet:{likes:req.params.id}
        },
        {new:true},
        (error, docs)=>{
            if(!error) res.send(docs);
            else return res.status(400).send(error);
        }
    )

   }
   catch(err){
    return res.status(400).send(err);

   } 

}
//router.patch("/unLikePost/:id", postController.unLikePost);

module.exports.unLikePost= async(req, res)=>{
    if(!objectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: "+ req.params.id);

    try{
        //Retirer les likers dans les likers du post
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull:{likers:req.body.id}
        },
        {new: true},
        (err, docs)=>{
            if(err) return res.status(400).send(err);
        }
        );

        //Retirer le like dans les likes du user
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull:{likes:req.params.id}
        },
        {new: true},
        (err, docs)=>{
            if(!err) return res.send(docs);
            else return res.status(400).send(err);
        }
        );
    }

        catch(err){
            res.status(400).send(err);
        }
    
    
}

//router.patch("/commentPost/:id", postController.commentPost);
module.exports.commentPost=async(req, res)=>{

}
//Editer un commentaire :router.patch("/editCommentPost/:id", postController.editCommentPost);
module.exports.editCommentPost=async(req, res)=>{
    
}
module.exports.deleteCommentPost=async(req, res)=>{

}
//Supprimer un commentaire:router.patch("/deleteCommentPost/:id", postController.deleteCommentPost);

