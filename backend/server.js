const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/moviebooking")
  .then(() => console.log("MongoDB Connected"));

app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});