const Router = require("express");
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const helpController = require("../controllers/help-controller");
const instructController = require("../controllers/instruct-controller");
const commentController = require("../controllers/comment-controller");
const cssController = require("../controllers/css-controller");
const sliderController = require("../controllers/slider-controller");
const phoneController = require("../controllers/phone-controller");
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
router.post("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/posts", authMiddleware, postController.create);
router.delete("/posts/:id", authMiddleware, postController.remove);
router.patch("/posts/edit/:id", authMiddleware, postController.edit);
router.get("/alltitles", postController.getAllTitles);
router.get("/posts/:sort/:asc/:page/:limit", postController.getAllPosts);
router.get("/post/:id", postController.getPostById);
router.post('/upload', authMiddleware, uploadMiddleware.single('image'), postController.upload);
router.post('/uploads', uploadMiddleware.single('image'), postController.upload);
router.post("/helps", authMiddleware, helpController.create);
router.patch("/helps", authMiddleware, helpController.edit);
router.delete("/helps", authMiddleware, helpController.remove);
router.get("/helps", helpController.getAllHelps);
router.get("/help", helpController.getHelpById);
router.post("/instructs", authMiddleware, instructController.create);
router.patch("/instructs", authMiddleware, instructController.edit);
router.delete("/instructs", authMiddleware, instructController.remove);
router.get("/instructs", instructController.getAllInstructs);
router.get("/instruct", instructController.getInsctructById);
router.post("/comments", authMiddleware, commentController.create);
router.delete("/comments", authMiddleware, commentController.remove);
router.patch("/comments", authMiddleware, commentController.edit);
router.get("/comments", commentController.getAllComments);
router.post("/create", authMiddleware, cssController.create);
router.get("/getCss", cssController.getAllCss);
router.post("/slider", authMiddleware, sliderController.create);
router.delete("/slider", authMiddleware, sliderController.remove);
router.get("/slider", sliderController.getAllSlider);
router.post("/phone", authMiddleware, phoneController.create);
router.get("/phone", phoneController.getAllPhone);

module.exports = router;