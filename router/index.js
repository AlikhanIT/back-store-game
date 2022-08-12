const Router = require("express");
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware.js");
const uploadMiddleware = require("../middlewares/upload-middleware.js");

const router = new Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    userController.registration
);
router.post("/login",
    body("email").isEmail(),
    userController.login
);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/posts", authMiddleware, postController.create);
router.delete("/posts/:id", authMiddleware, postController.remove);
router.patch("/posts/edit/:id", authMiddleware, postController.edit);
router.get("/alltitles", postController.getAllTitles);
router.get("/posts/:sort/:asc/:page/:limit", postController.getAllPosts);
router.get("/post/:id", postController.getPostById);
router.post('/upload', authMiddleware, uploadMiddleware.single('image'), postController.upload);

module.exports = router;