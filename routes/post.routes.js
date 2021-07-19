const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer")
const upload = multer()

router.post('/', upload.single("file"), postController.createPost);
router.get('/', postController.readPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unLikePost);

///routes des commentaires

//Laisser un commentaire à l'interieur d'un post
router.patch("/comment-post/:id", postController.commentPost);
//Editer un commentaire
router.patch("/edit-comment-post/:id", postController.editCommentPost);
//Supprimer un commentaire
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;