import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import jsPDF from "jspdf";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {};

  const downloadTicket = () => {
    const doc = new jsPDF();

    doc.text("Movie Ticket", 20, 20);
    doc.text(`Movie: ${booking.movieTitle}`, 20, 40);
    doc.text(`Seats: ${booking.seats.join(", ")}`, 20, 50);
    doc.text(`Date: ${booking.showDate}`, 20, 60);
    doc.text(`Time: ${booking.showTime}`, 20, 70);
    doc.text(`Total: ₹${booking.totalAmount}`, 20, 80);

    doc.save("ticket.pdf");
  };

  return (
    <div className="container mt-4 text-center">
      <h3>Booking Confirmed 🎉</h3>

      <p>Movie: {booking.movieTitle}</p>
      <p>Seats: {booking.seats.join(", ")}</p>
      <p>Date: {booking.showDate}</p>
      <p>Time: {booking.showTime}</p>
      <p>Total: ₹{booking.totalAmount}</p>

      <Button variant="contained" onClick={downloadTicket}>
        Download Ticket
      </Button>

      <Button className="mt-2" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
}