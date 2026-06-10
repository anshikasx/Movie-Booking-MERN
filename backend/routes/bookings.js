const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// GET /api/bookings/seats?movieId=&showDate=&showTime=  — public, no auth needed
router.get('/seats', async (req, res) => {
  try {
    const { movieId, showDate, showTime } = req.query;
    const bookings = await Booking.find({ movieId, showDate, showTime });
    const bookedSeats = bookings.flatMap(b => b.seats);
    res.json(bookedSeats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/bookings — only this user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/bookings — create booking for logged-in user
router.post('/', auth, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.id });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/bookings/:id — only owner can cancel
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });
    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;