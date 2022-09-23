const { tokenResponseErrors } = require("../helpers/jwtErrors");
const jwt = require("jsonwebtoken");
const { HttpResponse } = require("../helpers/http/HttpResponse");

const requireToken = (req, res, next) => {
  const response = HttpResponse(res);
  try {
    //Bearer token
    let token = req.headers?.authorization;

    if (!token) throw new Error("No bearer");

    token = token.split(" ")[1]; //split cuts the string into an array of substrings, and returns the new array

    const { exp } = jwt.decode(token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = payload.id;
    req.isAdmin = payload.isAdmin;
    
    next();
  } catch (err) {
    const { message } = err;
    const error = tokenResponseErrors[message] || "Invalid token";
    response.badRequest(error);
  }
};

module.exports = requireToken;
