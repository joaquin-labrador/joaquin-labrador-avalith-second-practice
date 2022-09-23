require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const expiresIn = 60 * 15;
  try {
    const { id, isAdmin } = user;
    const token = jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
      expiresIn,
    });

    //token.id tranformar a uid
    
    return { token, expiresIn };
  } catch (err) {
    console.log(err);
  }
};

const refreshToken = (uid, res) => {
  const expitesIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn: expitesIn,
    });

    return res.cookie("refreshToken", refreshToken, {
      maxAge: new Date(Date.now() + expitesIn * 1000),
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateToken, refreshToken };
