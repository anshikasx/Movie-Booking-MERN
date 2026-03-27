const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieId: String,
  movieTitle: String,
  seats: [String],
  totalAmount: Number,
  showDate: String,
  showTime: String
});

module.exports = mongoose.model("Booking", bookingSchema);