const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  language: String,
  duration: String,
  rating: Number,
  price: Number,
  poster: String,
  description: String,
  totalSeats: { type: Number, default: 40 },
  bookedSeats: [String]
});

module.exports = mongoose.model("Movie", movieSchema);