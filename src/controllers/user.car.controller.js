const db = require("../models/index");
const { Car, User } = db;
const { HttpResponse } = require("../helpers/http/HttpResponse");
const calculeAge = require("../helpers/getAge");

const getUsersAndCars = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      let users = await User.findAll({
        attributes: ["email", "userName", "birthDate"],
        include: Car,
      });

      console.log(users);
      users = users.map((user) => {
        const age = calculeAge(user.birthDate);
        return { ...user.dataValues, age };
      });

      return users.length > 0
        ? response.success(users)
        : response.notFound("No users found");
    } else return response.unauthorized("Unauthorized");
  } catch (error) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const getUserAndCarById = async (req, res) => {
  const response = HttpResponse(res);
  const { id } = req.params;
  try {
    if (req.isAdmin) {
      let user = await User.findOne({
        attributes: ["email", "userName", "birthDate"],
        where: { id },
        include: Car,
      });
      if (!user) {
        return response.notFound("User not found");
      }
      const age = calculeAge(user.birthDate);
      user = { ...user.dataValues, age };
      return response.success(user);
    } else return response.unauthorized("Unauthorized");
  } catch (error) {
    return response.serviceUnavailable("Service unavailable");
  }
};

const buyACar = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const { plate } = req.params;
    const car = await Car.findOne({
      where: { plate },
    });
    if (car.userId !== null) {
      return response.badRequest("Car already sold");
    }
    const carBought = await Car.update(
      {
        userId: req.uid,
      },
      { where: { plate } }
    );
    return carBought !== 0
      ? response.success("Car bought successfully")
      : response.notFound("We don't process this sale");
  } catch (error) {
    console.log(error);
    return response.serviceUnavailable("Service unavailable");
  }
};

const deleteSale = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const { plate } = req.params;
    const car = await Car.findOne({
      where: { plate },
    });
    if (car.userId === null) {
      return response.badRequest("Car already available");
    }
    const carBought = await Car.update(
      {
        userId: null,
      },
      { where: { plate } }
    );
    return carBought !== 0
      ? response.success("Sell cancelled successfully")
      : response.notFound("We don't process this oparation");
  } catch (error) {
    console.log(error);
    return response.serviceUnavailable("Service unavailable");
  }
};

const adminBuyCar = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (!req.isAdmin) return response.unauthorized("Unauthorized");
    const { plate } = req.body;
    const { userId } = req.body;

    const car = await Car.findOne({
      where: { plate },
    });
    if (car.userId !== null) {
      return response.badRequest("Car already sold");
    }
    const carBought = await Car.update(
      {
        userId,
      },
      { where: { plate } }
    );
    return carBought !== 0
      ? response.success("Car bought successfully")
      : response.notFound("We don't process this sale");
  } catch (error) {

    return response.serviceUnavailable("Service unavailable");
  }
};

module.exports = {
  getUsersAndCars,
  getUserAndCarById,
  buyACar,
  deleteSale,
  adminBuyCar,
};
