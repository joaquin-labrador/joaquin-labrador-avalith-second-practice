const db = require("../models/index");
const bcryptjs = require("bcryptjs");
const { generateToken, refreshToken } = require("../utils/manegerTokens");
const { User } = db;
const { HttpResponse } = require("../helpers/http/HttpResponse");
const calculeAge = require("../helpers/getAge");

// Create and Save a new User
const signUp = async (req, res) => {
  const response = HttpResponse(res);
  let { userName, email, password, birthDate, isAdmin } = req.body;
  try {
    //brithDate convert to string
    password = await bcryptjs.hash(password, 12);
    const user = await User.create({
      userName,
      email,
      password,
      birthDate,
      isAdmin,
    });
    return response.success(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return response.conflict("Username / email or password already exists");
    }
    return response.serviceUnavailable("Service Unavailable");
  }
};

//login
const logIn = async (req, res) => {
  const response = HttpResponse(res);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return response.badRequest("Username / email or password incorrect");
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return response.badRequest("Username / email or password incorrect");
    }
    const token = generateToken(user);
    refreshToken(user.id, res); //refresh token to cookie
    return response.success({ token });
  } catch (err) {
    console.log(err);
    if (err.name === "SequelizeDatabaseError")
      return response.badRequest("Invalid Data");
    return response.serviceUnavailable("Service Unavailable");
  }
};

//profile
const userProfile = async (req, res) => {
  const response = HttpResponse(res);
  try {
    let user = await User.findOne({
      //solo quiero las los emial y el nombre de usuario
      attributes: ["email", "userName", "birthDate"],
      where: { id: req.uid },
    });
    const age = calculeAge(user.birthDate);
    user = { ...user.dataValues, age };
    return response.success(user);
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const refresh = async (req, res) => {
  /*
  refresh token es para mayor seguridad ya que guardar el token en una cookie
  no es lo mas seguro.
  lo que se guarda en una cookie es un refresh token que se usa 
  para generar un nuevo token, que solo dura 15 minutos, de refrescar el token se encarga 
  el desarrollador frontend, y el backend solo se encarga de generar el nuevo token
  */
  const response = HttpResponse(res);
  try {
    const user = await User.findOne({ where: req.uid });
    const token = generateToken(user);
    refreshToken(req.uid, res);
    return response.success({ token });
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const userDelete = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const user = await User.findOne({ where: { id: req.uid } });
    if (!user) {
      return response.notFound("User not found");
    }
    //deletes user cookies
    res.clearCookie("refreshToken"); //clear cookie
    await user.destroy();
    response.success({ message: "User deleted" });
    res.end();
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const userUpdate = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const { userName, email } = req.body;
    const user = await User.update(
      {
        userName,
        email,
      },
      { where: { id: req.uid } }
    );
    console.log(user[0]);
    return user[0]
      ? response.success({ message: "User updated" })
      : response.forbidden("You can't update this information");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return response.conflict("Username / email already exists");
    }
    return response.serviceUnavailable("Service Unavailable");
  }
};

const updatePassword = async (req, res) => {
  const response = HttpResponse(res);
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.uid } });
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return response.badRequest("Old password incorrect");
    }
    const hasPassword = await bcryptjs.hash(newPassword, 12);
    await user.update({ password: hasPassword });
    return response.success({ message: "Password updated" });
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};
const logOut = async (req, res) => {
  const response = HttpResponse(res);
  try {
    res.clearCookie("refreshToken");
    response.success({ message: "Log out" });
    res.end();
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

//!only admin
const deleteUserById = async (req, res) => {
  const response = HttpResponse(res);
  try {
    const { id } = req.params;
    //find uner by req.uid and isAdmin
    if (req.isAdmin) {
      const userToDelete = await User.findOne({ where: { id } });
      if (!userToDelete) {
        return response.notFound("User not found");
      }
      await userToDelete.destroy();
      return response.success({ message: "User deleted" });
    } else {
      return response.unauthorized("Unauthorized");
    }
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const getAllUsers = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      let users = await User.findAll({
        attributes: ["userName", "email", "birthDate", "isAdmin"],
      });
      users = users.map((user) => {
        const age = calculeAge(user.birthDate);
        return { ...user.dataValues, age };
      });
      return response.success(users);
    } else {
      return response.unauthorized("Unauthorized");
    }
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const getUserById = async (req, res) => {
  const response = HttpResponse(res);
  const id = req.params.id;
  try {
    if (req.isAdmin) {
      let user = await User.findOne({
        attributes: ["userName", "email", "birthDate", "isAdmin"],
        where: { id },
      });
      if (!user) {
        return response.notFound("User not found");
      }
      const age = calculeAge(user.birthDate);
      user = { ...user.dataValues, age };
      return response.success(user);
    } else {
      return response.unauthorized("Unauthorized");
    }
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};

const updateUserById = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const { userName, email } = req.body;
      const { id } = req.params;
      const user = await User.update(
        {
          userName,
          email,
        },
        { where: { id } }
      );

      return user[0]
        ? response.success({ message: "User updated" })
        : response.forbidden("You can't update this information");
    }
    return response.unauthorized("Unauthorized");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return response.conflict("Username / email already exists");
    }
    return response.serviceUnavailable("Service Unavailable");
  }
};

const updateToAdmin = async (req, res) => {
  const response = HttpResponse(res);
  try {
    if (req.isAdmin) {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return response.notFound("User not found");
      }
      if (user.isAdmin)
        return response.badRequest("This user is already an admin");

      await user.update({
        isAdmin: true,
      });

      return response.success("User updated to admin");
    }
    return response.unauthorized("Unauthorized");
  } catch (err) {
    return response.serviceUnavailable("Service Unavailable");
  }
};
module.exports = {
  signUp,
  logIn,
  userProfile,
  refresh,
  userDelete,
  deleteUserById,
  getAllUsers,
  getUserById,
  userUpdate,
  updateUserById,
  updatePassword,
  updateToAdmin,
  logOut,
};
