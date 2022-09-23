const express = require("express");
const router = express.Router();
const requireToken = require("../middleware/requireToken");
const userCarController = require("../controllers/user.car.controller");

router.put("/buycar/:plate", requireToken, userCarController.buyACar);
//!admin routes
router.get("", requireToken, userCarController.getUsersAndCars);
router.get("/:id", requireToken, userCarController.getUserAndCarById);
router.delete("/deletesale/:plate", requireToken, userCarController.deleteSale);
router.put("/adminBuyCar", requireToken, userCarController.adminBuyCar);

module.exports = router;
