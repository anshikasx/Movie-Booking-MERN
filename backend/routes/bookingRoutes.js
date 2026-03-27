router.post("/", async (req, res) => {
    try {
      const { movieId, movieTitle, seats, totalAmount, showDate, showTime } = req.body;
  
      // IST Date validation
      const todayIST = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
      });
  
      if (showDate < todayIST) {
        return res.status(400).json({ error: "Cannot book past dates" });
      }
  
      const booking = new Booking({
        movieId,
        movieTitle,
        seats,
        totalAmount,
        showDate,
        showTime
      });
  
      await booking.save();
  
      await Movie.findByIdAndUpdate(movieId, {
        $push: { bookedSeats: { $each: seats } }
      });
  
      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });