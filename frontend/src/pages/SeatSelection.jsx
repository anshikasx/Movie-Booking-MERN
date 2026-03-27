import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Card } from "@mui/material";

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");

  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const getTodayIST = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/movies")
      .then(res => res.json())
      .then(data => {
        const selectedMovie = data.find(m => m._id === id);
        setMovie(selectedMovie);
        setBookedSeats(selectedMovie.bookedSeats || []);
      });
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  const seatPrice = (seat) => {
    const row = seat[0];
    if (row === "A") return 120;
    if (row === "B") return 150;
    if (row === "C") return 180;
    if (row === "D") return 220;
    if (row === "E") return 250;
    return movie.price;
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalAmount = selectedSeats.reduce(
    (total, seat) => total + seatPrice(seat),
    0
  );

  return (
    <div className="container mt-4">
      <Typography variant="h5">Select Seats 🎟</Typography>

      {/* Date & Time */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select Date</label>
          <input
            type="date"
            className="form-control"
            min={getTodayIST()}
            value={showDate}
            onChange={(e) => setShowDate(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label>Select Time</label>
          <select
            className="form-control"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
            <option>7:00 PM</option>
            <option>10:00 PM</option>
          </select>
        </div>
      </div>

      <Card className="p-4">
        <div className="text-center mb-3">SCREEN THIS SIDE 🎬</div>

        <div className="d-flex flex-column align-items-center gap-2">
          {rows.map((row) => (
            <div key={row} className="d-flex gap-2">
              {cols.map((col) => {
                const seat = `${row}${col}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isBooked}
                    className={`seat-btn ${
                      isBooked ? "seat-booked" :
                      isSelected ? "seat-selected" : ""
                    }`}
                    >
                      {seat}
                    </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 text-center">
          <p>Seats: {selectedSeats.join(", ") || "None"}</p>
          <p>Total: ₹{totalAmount}</p>

          <Button
            fullWidth
            variant="contained"
            disabled={
              selectedSeats.length === 0 ||
              showDate === "" ||
              showTime === ""
            }
            onClick={() =>
              navigate("/summary", {
                state: {
                  movie,
                  selectedSeats,
                  total: totalAmount,
                  showDate,
                  showTime
                }
              })
            }
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}