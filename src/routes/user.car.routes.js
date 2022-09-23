const express = require("express");
const router = express.Router();
const requireToken = require("../middleware/requireToken");
const userCarController = require("../controllers/user.car.controller");
const { validateBody, validatePlate } = require("../middleware/validateCars");

router.put(
  "/buycar/:plate",
  validatePlate,
  requireToken,
  userCarController.buyACar
);
//!admin routes
router.get("", requireToken, userCarController.getUsersAndCars);
router.get("/:id", requireToken, userCarController.getUserAndCarById);
router.delete(
  "/deletesale/:plate",
  validatePlate,
  requireToken,
  userCarController.deleteSale
);
router.put(
  "/adminBuyCar",
  validateBody,
  requireToken,
  userCarController.adminBuyCar
);

module.exports = router;
