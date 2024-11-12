const express = require("express");
const router = express.Router();

const { signIn, signUp, verifyToken } = require("../controllers/userController.js");



router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.get("/sign-in", verifyToken, (req, res) => {

    res.send({ msg: "Ceci est une route protégée", user: req.user });
});

module.exports = router;