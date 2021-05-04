const router= require ('express').Router();
const authController= require('../controllers/auth.controller');
const userController= require ('../controllers/user.controller');

//Authen
//Creer un compte
router.post("/register", authController.signUp);
//Se connecter
router.post("/login", authController.signIn);
//Se deconnecter
router.get("/logout", authController.logout);

//Requette HTTP GET
router.get("/", userController.getUsers);

//Requette HTTP GETBYID
router.get("/:id", userController.getUserById);

//Requette HTTP PUT
router.put("/:id", userController.updateUser);

//Requette HTTP DELETE
router.delete("/:id", userController.deleteUser);

//Requette HTTP PATCH pour follow. Un patch permet d'ajouter sans supprimer
router.patch("/follow/:id", userController.followUsers);

//Requette HTTP PATCH pour unfollow
router.patch("/unfollow/:id", userController.unfollowUsers);



module.exports= router;