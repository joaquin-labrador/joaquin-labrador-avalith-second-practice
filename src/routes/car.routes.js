const express = require("express");
const carController = require("../controllers/car.controller");
const requireToken = require("../middleware/requireToken");
const { validateBody, validatePlate } = require("../middleware/validateCars");
const router = express.Router();

router.get("/profilecars", requireToken, carController.getUserCar);
router.get("/getnewcars", carController.getZeroKmCars);
// this cars are available to buy:
router.get("/getavailablecars", carController.getAvailableCars);

//!admin routes
router.get("", requireToken, carController.getAllCars);
router.post("/createcar", requireToken, validateBody, carController.createCar);
router.delete(
  "/delete/:plate",
  validatePlate,
  requireToken,
  carController.deleteCar
);
router.put(
  "/update/:plate",
  validatePlate,
  validateBody,
  requireToken,
  carController.updateCar
);
router.get("/:plate", validatePlate, requireToken, carController.getCarByPlate);

module.exports = router;
