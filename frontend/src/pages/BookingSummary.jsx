import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Box, Typography, Button, Card, CardContent,
  Divider, CircularProgress, Chip
} from "@mui/material";
import {
  LocalMovies, EventSeat, CalendarToday,
  AccessTime, CurrencyRupee, CheckCircle
} from "@mui/icons-material";

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { movie, selectedSeats, total, showDate, showTime } = location.state;

  const confirmBooking = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(
        "http://localhost:5001/api/bookings",
        {
          movieId: movie._id,
          movieTitle: movie.title,
          seats: selectedSeats,
          totalAmount: total,
          showDate,
          showTime
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/confirmation", {
        state: { movieTitle: movie.title, seats: selectedSeats, totalAmount: total, showDate, showTime }
      });
    } catch (err) {
      setError("Booking failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #110000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      px: 2, py: 6
    }}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" fontWeight="900" color="white" mb={4}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalMovies sx={{ color: '#e50914' }} /> Booking Summary
        </Typography>

        <Card sx={{
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(229,9,20,0.3)',
          borderRadius: 3
        }}>
          <CardContent sx={{ p: 4 }}>

            {/* Movie title */}
            <Typography variant="h5" fontWeight="900" color="white" mb={3}>
              {movie.title}
            </Typography>

            <Divider sx={{ borderColor: 'rgba(229,9,20,0.2)', mb: 3 }} />

            {/* Details */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EventSeat sx={{ color: '#e50914' }} />
                <Box>
                  <Typography variant="caption" color="#666">Seats</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {selectedSeats.map(seat => (
                      <Chip key={seat} label={seat} size="small"
                        sx={{ background: 'rgba(229,9,20,0.2)', color: '#ff8a80',
                          border: '1px solid rgba(229,9,20,0.4)', fontWeight: 700 }} />
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ color: '#e50914' }} />
                <Box>
                  <Typography variant="caption" color="#666">Date</Typography>
                  <Typography variant="body1" color="white" fontWeight="600">{showDate}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTime sx={{ color: '#e50914' }} />
                <Box>
                  <Typography variant="caption" color="#666">Show Time</Typography>
                  <Typography variant="body1" color="white" fontWeight="600">{showTime}</Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: 'rgba(229,9,20,0.2)', mb: 3 }} />

            {/* Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="#aaa">Total Amount</Typography>
              <Typography variant="h5" fontWeight="900" color="white"
                sx={{ display: 'flex', alignItems: 'center' }}>
                <CurrencyRupee sx={{ fontSize: 22 }} />{total}
              </Typography>
            </Box>

            {error && (
              <Typography color="#ff6b6b" variant="body2" mb={2} textAlign="center">
                {error}
              </Typography>
            )}

            <Button fullWidth variant="contained" size="large"
              onClick={confirmBooking} disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CheckCircle />}
              sx={{
                py: 1.8, fontWeight: 800, fontSize: '1rem',
                background: 'linear-gradient(135deg, #e50914, #b20710)',
                borderRadius: 2,
                '&:hover': { background: 'linear-gradient(135deg, #ff1a1a, #e50914)' }
              }}>
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </Button>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}