const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//import routes from routes directory
const recordRoutes = require("./routes/record");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

//app
const app = express();

//connect to database
mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected successfully!!"))
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(morgan("dev"));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//route middlewares
app.use(recordRoutes);
app.use(authRoutes);
app.use(userRoutes);

const PORT =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;

//setup a server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port, Happy Coding :)!`);
});
