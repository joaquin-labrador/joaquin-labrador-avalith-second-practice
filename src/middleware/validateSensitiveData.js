const { body, validationResult } = require("express-validator");
const {HttpResponse} = require('../helpers/http/HttpResponse')


const errorValidatorHandler = (req, res, next) => {
  const response = HttpResponse(res);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {  
    return response.badRequest(errors.array()[0].msg);
  }
  next();
};

const validateUserName = [
  //que no sea un numero
  body("userName", "userName invalid").isString().trim().notEmpty(),
  errorValidatorHandler
];

const validateEmail = [
  body("email", "email invalid").isEmail().normalizeEmail().trim(),
  errorValidatorHandler
];

const validateNewPassword = [
  body(
    "password",
    "at least 8 characters must contain at least 1 uppercase letter 1 lowercase letter, and 1 number Can contain special characters"
  )
    .trim()
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    .custom((value, { req }) => {
      if (value !== req.body.rePassword) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
  errorValidatorHandler

];

const validatePassword = [
  body(
    "password",
    "Invalid password"
  )
    .trim()
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),

  errorValidatorHandler

];

module.exports = {
  validateUserName,
  validateEmail,
  validateNewPassword,
  validatePassword,
};
