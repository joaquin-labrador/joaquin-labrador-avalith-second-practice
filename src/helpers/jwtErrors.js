const tokenResponseErrors = {
  //this is an object
  ["invalid token"]: "Invalid token", //[property]: value
  ["jwt malformed"]: "Invalid token",
  ["jwt expired"]: "Token expired",
  ["invalid signature"]: "The token is not valid",
  ["No bearer"]: "Token not found, use Bearer token format",
};

module.exports = { tokenResponseErrors };
