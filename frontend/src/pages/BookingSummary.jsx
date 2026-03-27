import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "@mui/material";

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, selectedSeats, total, showDate, showTime } = location.state;

  const confirmBooking = async () => {
    await fetch("http://localhost:5001/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movieId: movie._id,
        movieTitle: movie.title,
        seats: selectedSeats,
        totalAmount: total,
        showDate,
        showTime
      })
    });

    navigate("/confirmation", {
      state: {
        movieTitle: movie.title,
        seats: selectedSeats,
        totalAmount: total,
        showDate,
        showTime
      }
    });
  };

  return (
    <div className="container mt-4">
      <h3>Booking Summary</h3>

      <Card className="p-4">
        <p>Movie: {movie.title}</p>
        <p>Seats: {selectedSeats.join(", ")}</p>
        <p>Date: {showDate}</p>
        <p>Time: {showTime}</p>
        <p>Total: ₹{total}</p>

        <Button variant="contained" onClick={confirmBooking}>
          Confirm Booking
        </Button>
      </Card>
    </div>
  );
}