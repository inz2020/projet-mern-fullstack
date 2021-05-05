const router=require('express').Router();
const postController= require('../controllers/post.controller');


router.post('/', postController.createPost);
router.get('/',postController.readPost);
router.put("/:id",postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/likePost/:id", postController.likePost);
router.patch("/unLikePost/:id", postController.unLikePost);

///routes des commentaires

router.patch("/commentPost/:id", postController.commentPost);
//Editer un commentaire
router.patch("/editCommentPost/:id", postController.editCommentPost);
//Supprimer un commentaire
router.patch("/deleteCommentPost/:id", postController.deleteCommentPost);

module.exports=router;

