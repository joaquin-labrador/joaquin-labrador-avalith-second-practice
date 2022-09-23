const { tokenResponseErrors } = require("../helpers/jwtErrors");
const jwt = require("jsonwebtoken");
const { HttpResponse } = require("../helpers/http/HttpResponse");
const requireRefreshToken = (req, res, next) => {
  const response = HttpResponse(res);
  try {
    const refrshToken = req.cookies.refreshToken;
    if (!refrshToken) throw new Error("No refresh token");
    const { uid } = jwt.verify(refrshToken, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (err) {
    const { message } = err;
    const error = tokenResponseErrors[message] || "Invalid token";
    response.badRequest(error);
  }
};

module.exports = requireRefreshToken;
