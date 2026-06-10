require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookings");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});