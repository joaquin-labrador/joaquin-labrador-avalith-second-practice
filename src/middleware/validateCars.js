const { HttpResponse } = require("../helpers/http/HttpResponse");
const validateBody = (req, res, next) => {
  const response = HttpResponse(res);
  console.log(req.body);
  let plate = req.body.plate;
  const { brand, name, userId , kmTraveled, price, description, year, color } = req.body;
  if (
    !plate &&
    !brand &&
    !name &&
    !kmTraveled &&
    !price &&
    !description &&
    !year &&
    !userId &&
    !color
  ) {
    return response.badRequest("Missing body");
  }
  if (plate) {
    plate = plate.toUpperCase();
    const oldPlatesRegex = /^[A-Z]{3}-[0-9]{3}$/g;
    const newPlatesRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/g;
    if (!oldPlatesRegex.test(plate) || !newPlatesRegex.test(plate)) {
      return response.badRequest("Invalid plate format");
    }
    next();
  }
  return response.badRequest("Missing plate is required");
 
};

const validatePlate = (req, res, next) => {
  const response = HttpResponse(res);
  const plate = req.params.plate.toUpperCase();
  const oldPlatesRegex = /^[A-Z]{3}-[0-9]{3}$/g;
  const newPlatesRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/g;
  if (!oldPlatesRegex.test(plate) || !newPlatesRegex.test(plate)) {
    return response.badRequest("Invalid plate");
  }
  next();
};
module.exports = { validateBody, validatePlate };
