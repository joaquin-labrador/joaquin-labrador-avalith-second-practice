const db = require("../models/index");
const { Car } = db;
const { HttpResponse } = require("../helpers/http/HttpResponse");


const getUserCar = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const cars = await Car.findAll({
      where: {
        //for foreign key
        userId: req.uid,
      },
    });
    return cars.length > 0
      ? response.success(cars)
      : response.notFound("No cars found");
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const getZeroKmCars = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const cars = await Car.findAll({
      where: {
        kmTraveled: 0,
      },
    });
    return cars.length > 0
      ? response.success(cars)    
      : response.notFound("No cars found");
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const getAvailableCars = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const cars = await Car.findAll({
      where: {
        userId: null, 
      },
    });
    return cars.length > 0  
      ? response.success(cars)
      : response.notFound("No cars found");
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};



//!admin routes
const getAllCars = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const cars = await Car.findAll();
      return cars.length > 0
        ? response.success(cars)
        : response.notFound("No cars found");
    } else {
      return response.unauthorized("Unauthorized");
    }
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const createCar = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const { name, brand, price, color, description, year, kmTraveled } =
        req.body;
      await Car.create({
        name,
        brand,
        price,
        color,
        description,
        year,
        kmTraveled,
      });
      return response.success("Car created successfully");
    } else {
      return response.unauthorized("Unauthorized");
    }
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const deleteCar = async (req, res) => {
  const response = HttpResponse(res);
  console.log(req.params.plate);
  try {
    if (req.isAdmin) {
      const { plate } = req.params;
      const car = await Car.destroy({
        where: {
          plate,
        },
      });
      //Model.destroy() returns the number of rows deleted
      return car !== 0
        ? response.success("Car deleted successfully")
        : response.notFound("Car not found");
    } else return response.unauthorized("Unauthorized");
  } catch (err) {
    console.log(err);
    return response.serviceUnavailable("Service unavailable");
  }
};

const updateCar = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const { plate } = req.params;
      const { name, brand, price, color, description, year, kmTraveled } =
        req.body;
      const car = await Car.update(
        {
          name,
          brand,
          price,
          color,
          description,
          year,
          kmTraveled,
        },
        {
          where: {
            plate,
          },
        }
      );
      return car !== 0
        ? response.success("Car updated successfully")
        : response.notFound("Car not found");
    } else return response.unauthorized("Unauthorized");
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};
const getCarByPlate = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const { plate } = req.params;
      const car = await Car.findOne({ where: { plate } });
      if (!car) {
        return response.notFound("Not car found");
      }
      return response.success(car);
    } else return response.unauthorized("Unauthorized");
  } catch (err) {
    return response.serviceUnavailable("Service unavailable");
  }
};

module.exports = {
  getUserCar,
  getZeroKmCars,
  getAvailableCars,
  getAllCars,
  createCar,
  deleteCar,
  updateCar,
  getCarByPlate,
};
