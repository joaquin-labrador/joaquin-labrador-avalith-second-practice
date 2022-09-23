const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  validateEmail,
  validateNewPassword,
  validatePassword,
  validateUserName,
} = require("../middleware/validateSensitiveData");
const requireToken = require("../middleware/requireToken");
const requireRefreshToken = require("../middleware/requireRefereshToken");


router.post(
  "/signup",
  validateEmail,
  validateUserName,
  validateNewPassword,
  userController.signUp
);

//el usuario se puede logear con su email
router.post(
  "/login",
  validateEmail,
  validatePassword,
  userController.logIn
);

router.get("/userprofile", requireToken, userController.userProfile);
router.get("/refresh", requireRefreshToken, userController.refresh);
router.delete("/delete", requireToken, userController.userDelete);
router.get("/logout", userController.logOut);
/**
 * For the Updates yo will send the email and the userName in the body
 */
router.put(
  "/update",
  validateUserName,
  validateEmail,
  requireToken,
  userController.userUpdate
);

router.put("/updatepassword", requireToken, userController.updatePassword);

//! only admin routes:
router.delete("/delete/:id", requireToken, userController.deleteUserById);
//TODO: limit and offset implementation
router.get("/getusers", requireToken, userController.getAllUsers);

router.get("/getusers/:id", requireToken, userController.getUserById);

router.put(
  "/update/:id",
  validateUserName,
  validateEmail,
  requireToken,
  userController.updateUserById
);

router.put(
  "/updateadmin/:id",
  validateUserName,
  validateEmail,
  requireToken,
  userController.updateToAdmin
);

module.exports = router;
