const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");

router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();

  await Movie.findByIdAndUpdate(
    req.body.movieId,
    { $push: { bookedSeats: { $each: req.body.seats } } }
  );

  res.json(booking);
});

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.delete("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  await Movie.findByIdAndUpdate(
    booking.movieId,
    { $pull: { bookedSeats: { $in: booking.seats } } }
  );

  await Booking.findByIdAndDelete(req.params.id);

  res.json({ message: "Cancelled" });
});

module.exports = router;