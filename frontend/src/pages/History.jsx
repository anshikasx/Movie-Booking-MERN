import React, { useEffect, useState } from "react";
import { Card, Button } from "@mui/material";

export default function History() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    fetch("http://localhost:5001/api/bookings")
      .then(res => res.json())
      .then(data => setBookings(data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Booking History</h3>

      {bookings.length === 0 ? (
        <Card className="p-4 mt-3 text-center">
          <h5>No bookings yet!</h5>
          <p>Your movie ticket bookings will appear here.</p>
        </Card>
      ) : (
        bookings.map((b) => (
          <Card key={b._id} className="p-3 mb-3">
            <h5>{b.movieTitle}</h5>
            <p>Seats: {b.seats.join(", ")}</p>
            <p>Date: {b.showDate}</p>
            <p>Time: {b.showTime}</p>
            <p>Total: ₹{b.totalAmount}</p>

            <Button
              color="error"
              onClick={async () => {
                await fetch(
                  `http://localhost:5001/api/bookings/${b._id}`,
                  { method: "DELETE" }
                );
                loadBookings();
              }}
            >
              Cancel Booking
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}