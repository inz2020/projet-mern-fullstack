const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const objectID = require('mongoose').Types.ObjectId;
const fs = require('fs')
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require("stream").pipeline);


//router.post('/', postController.createPost);
module.exports.createPost = async(req, res) => {

    //Traitement de req.file
    let filename;

    //verification du media envoyé
    if (req.filename !== null) {
        try {
            if (req.file.detectedMimeType !== "image/jpg" &&
                req.file.detectedMimeType !== "image/png" &&
                req.file.detectedMimeType !== "image/jpeg")

                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");

        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(201).json({ errors });
        }
        //Aprés le try catch, on s'assure que le filename aura l'extension jpg
        filename = req.body.postId + Date.now() + ".jpg";

        //creation du fichier
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/application/public/uploads/posts/${filename}`
            )
        )

    }
    const newPost = new postModel({
        postId: req.body.postId,
        message: req.body.message,
        image: req.file !== null ? "./uploads/posts/" + filename : "",
        video: req.body.video,
        likers: [],
        comments: []
    });
    //incrementer
    try {
        const post = await newPost.save();
        return res.status(201).json(post);

    } catch (err) {
        return res.status(400).send(err);

    }

}

// router.get('/',postController.readPost);
//On voudra afficher les posts par ordre d'arrivée (du plus récent au plus ancien), c'est pourquoi on fait un 'sort'
module.exports.readPost = (req, res) => {
    postModel.find(
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log('Error to get data!!' + err);
        }
    ).sort({ createdAt: -1 });

}

//router.put('/',postController.updatePost);
module.exports.updatePost = (req, res) => {
    //Controller si l'ID est bien passé

    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID Unknown: " + req.params.id);

    const updateRecord = {
        message: req.body.message
    };

    postModel.findByIdAndUpdate(
        req.params.id, { $set: updateRecord }, { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error: " + err);
        }
    )

}

//router.delete('/', postController.deletePost);
module.exports.deletePost = (req, res) => {

    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID Unknown: " + req.params.id);

    postModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) return res.send(docs);
            else console.log('Delete errr: ' + err);
        }
    );

}


//router.patch("/likePost/:id", postController.likePost);
module.exports.likePost = async(req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID Unknown: " + req.params.id);

    try {
        //Ajouter l'user dans les likes du Post
        //Recuperer le likes à partir  de  l'id de la post  
        await postModel.findByIdAndUpdate(
            req.params.id, {
                $addToSet: { likers: req.body.id }
            }, { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        //Ajouter le like dans les likes du user
        await userModel.findByIdAndUpdate(
            req.body.id, {
                $addToSet: { likes: req.params.id }
            }, { new: true },
            (error, docs) => {
                if (!error) res.send(docs);
                else return res.status(400).send(error);
            }
        )

    } catch (err) {
        return res.status(400).send(err);

    }

}


//router.patch("/unLikePost/:id", postController.unLikePost);
module.exports.unLikePost = async(req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("Unknow ID: " + req.params.id);

    try {
        //Retirer les likers dans les likers du post
        await postModel.findByIdAndUpdate(
            req.params.id, {
                $pull: { likers: req.body.id }
            }, { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        //Retirer le like dans les likes du user
        await userModel.findByIdAndUpdate(
            req.body.id, {
                $pull: { likes: req.params.id }
            }, { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        res.status(400).send(err);
    }


}

//Definir un commentaire:router.patch("/comment-post/:id", postController.commentPost);
module.exports.commentPost = (req, res) => {
        if (!objectID.isValid(req.params.id))
            return res.status(400).send("Unknow ID: " + req.params.id);

        try {
            //Recuperer l'id du post puis modifier le tableau commentaire
            return postModel.findByIdAndUpdate(
                req.params.id, {
                    //on n'écrase pas le tableau mais on ajoute un nouvel commentaire
                    $push: {
                        comments: {
                            commentId: req.body.commentId,
                            commentPseudo: req.body.commentPseudo,
                            text: req.body.text,
                            timestamp: new Date().getTime(),
                        },
                    },
                }, { new: true },
                (err, docs) => {
                    //Si aucune erreur, alors  retouner la data
                    if (!err) return res.send(docs);
                    else return res.status(400).send(err);
                }
            );
        } catch (err) {
            res.status(400).send(err);

        }

    }
    //Editer un commentaire :router.patch("/edit-comment-post/:id", postController.editCommentPost);
    //on recupère l'id generé automatiquement par mangoose
module.exports.editCommentPost = (req, res) => {
    //req.params.id:permet de pointer l'article en le mettant dans l'url
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("Unknow ID: " + req.params.id);
    try {
        return postModel.findById(
            req.params.id,
            (err, docs) => {
                //Trouver dans le docs le commentraire qui correspond. La variable 'theComment' correspond au commentaire à éditer
                const theComment = docs.comments.find(
                    (comment) => comment._id.equals(req.body.commentId))

                if (!theComment) return res.status(404).send('Comment not found!!');
                theComment.text = req.body.text;

                return docs.save(
                    (err) => {
                        if (!err) return res.status(200).send(docs);
                        else return res.status(500).send(err);
                    });
            });

    } catch (err) {
        res.status(400).send(err);
    }

}

//Supprimer un commentaire:router.patch("/delete-comment-post/:id", postController.deleteCommentPost);
module.exports.deleteCommentPost = async(req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("Unknow ID: " + req.params.id);

    try {

        return postModel.findByIdAndUpdate(
            req.params.id, {
                $pull: { comments: { _id: req.body.commentId } }
            }, { new: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                else { return res.status(400).send(err) }
            }
        );

    } catch (err) {
        res.status(400).send(err);
    }

}