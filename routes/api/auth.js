const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares/");
const { auth: ctrl } = require("../../controllers");
const { joiSchemaRegister, joiSchemaLogin } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiSchemaRegister),
  ctrlWrapper(ctrl.register)
);
// или router.post("/signup");
router.post("/login", validation(joiSchemaLogin), ctrlWrapper(ctrl.login));
// или  router.post("/signin")
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
// или router.get("/signout")
module.exports = router;
