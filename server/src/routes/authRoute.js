const express = require("express");
const router = express.Router();

const { signIn, signUp } = require("../controllers/userController.js");

router.get("/sign-in", signIn);

router.post("/sign-up", signUp);

module.exports = router;