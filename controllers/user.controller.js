const userModel= require('../models/user.model');
const objectID= require ('mongoose').Types.ObjectId;

//Liste de tous les users
module.exports.getUsers= async (req, res)=>{
    //On ne veut pas que le password transite
   const users= await userModel.find().select('-password');
   res.status(200).json(users);
}

//Info d'un seul user

module.exports.getUserById= (req, res)=>{
    console.log(req.params);
    if (!objectID.isValid(req.params.id))
    return res.status(400).send('ID Unknow: '+ req.params.id);

    userModel.findById(req.params.id, (err, docs)=>{
        if (!err) res.send(docs);
        else console.log('ID Unknown: '+ err);
    }).select('-password');

};

//Update user
module.exports.updateUser= async(req, res)=>{
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID Unknow: '+ req.params.id);
    try{
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set:{bio:req.body.bio}
            },
            {new: true, upsert: true, setDefaultsOnInsert:true},

            (err, docs)=>{
                if(!err) return res.send(docs);
                else return res.status(500).send({message:err});
            }
        );

    }
    catch(err){
        res.status(500).json({message: err});
    }

}

module.exports.deleteUser= async(req, res)=>{

    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID unknow: '+ req.params.id);
    try{
        await userModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.status(500).json({message: "Successfully deleted!!"});
        
    }
    catch(err){
        res.status(500).json({message: err});
    }

}

module.exports.followUsers= async(req, res)=>{
    if(!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToFollow) )
    return res.status(400).send('ID Unknow: '+ req.params.id);

    try{
        //ajouter le user avec id donné à la liste des folllowers
        //idToFollow est l'id de la personne qui est suivie
        await userModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            {new: true, upsert: true},
            (err, docs)=>{
                if(!err) res.status(201).json(docs);
                else return res.status(400).json({message: err});
            }
        );
        //Pour la personne qui est suivie(les following)
        await userModel.findByIdAndUpdate(
            req.body.idToFollow,
            //addToSet permet d'ajouter l'element idToFollow au tableau
            {$addToSet:{followers: req.params.id} },
            {new: true, upsert: true},
            (err, docs)=>{
               // if(!err) res.status(201).json(docs);
               if(err) res.status(400).json({message:err});

            }
        );

    }
    catch(err){
        res.status(500).json({message: err});
    }

}

module.exports.unfollowUsers= async(req, res)=>{
    if(!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToUnFollow))
    return res.status(400).send('ID Unknown: '+ req.params.id);

    try{
        //Ajouter un following à la liste des following d'un follower
        await userModel.findByIdAndUpdate(
            req.params.id,
            //Cette fois-ci on retire 
            {$pull:{following: req.body.idToUnFollow}},

            (err, docs)=>{
                if(!err) res.status(201).json(docs);
                else return res.status(500).json(err);
            } 
            );

             //Ajouter un follower à la liste des followers d'un following
        await userModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            {$pull:{followers: req.params.id}},

            (err)=>{
                 if(err) return res.status(500).json(err);
            } 
            );
        

    }
    catch(err){

        res.status(500).json({message: err});
    }


    

    
}