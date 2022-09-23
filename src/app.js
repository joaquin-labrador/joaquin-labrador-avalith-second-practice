const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const carRoutes = require("./routes/car.routes");
const userCarRoutes = require("./routes/user.car.routes");
const errors = require("./middleware/errors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

app.use("/api/user", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/usercars", userCarRoutes);

//middleware for errors
app.use(errors.invalidRoute);
app.use(errors.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
