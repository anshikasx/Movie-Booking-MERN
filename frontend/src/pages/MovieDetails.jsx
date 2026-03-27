import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Card } from "@mui/material";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5001/api/movies`)
      .then(res => res.json())
      .then(data => {
        const m = data.find(x => x._id === id);
        setMovie(m);
      });

    fetch(`http://localhost:5001/api/bookings/count/${id}`)
      .then(res => res.json())
      .then(data => setBookingCount(data.count));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="container mt-4">
      <Card className="glass-card p-4">
        <Typography variant="h4">{movie.title}</Typography>
        <Typography>{movie.description}</Typography>
        <Typography>Bookings: {bookingCount}</Typography>

        <Button
          className="neon-btn mt-3"
          onClick={() => navigate(`/seats/${movie._id}`)}
        >
          Book Tickets
        </Button>
      </Card>
    </div>
  );
}