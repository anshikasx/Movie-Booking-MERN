import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Card, CardContent, Chip } from "@mui/material";
import { CalendarToday, AccessTime } from "@mui/icons-material";

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
  const rowPrices = { A: 120, B: 150, C: 180, D: 220, E: 250 };

  const getTodayIST = () => {
    const now = new Date();
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    return istTime.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/movies`)
      .then(res => res.json())
      .then(data => setMovie(data.find(m => m._id === id)));
  }, [id]);

  useEffect(() => {
    if (!showDate || !showTime || !id) return;
    setSelectedSeats([]);
    fetch(`http://localhost:5001/api/bookings/seats?movieId=${id}&showDate=${showDate}&showTime=${encodeURIComponent(showTime)}`)
      .then(res => res.json())
      .then(seats => setBookedSeats(seats))
      .catch(() => setBookedSeats([]));
  }, [id, showDate, showTime]);

  if (!movie) return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography color="#666">Loading...</Typography>
    </Box>
  );

  const seatPrice = (seat) => rowPrices[seat[0]] || movie.price;

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seatPrice(seat), 0);

  const getSeatStyle = (seat) => {
    const isBooked = bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);
    const row = seat[0];
    const base = {
      width: 38, height: 38, borderRadius: 6, fontSize: 11,
      fontWeight: 700, cursor: isBooked ? 'not-allowed' : 'pointer',
      border: 'none', transition: 'all 0.15s ease',
    };
    if (isBooked)   return { ...base, background: '#2a2a2a', color: '#444' };
    if (isSelected) return { ...base, background: '#e50914', color: 'white', transform: 'scale(1.1)', boxShadow: '0 0 10px rgba(229,9,20,0.6)' };
    const tierColors = { A: '#1a3a1a', B: '#1a2a3a', C: '#2a2a1a', D: '#2a1a2a', E: '#3a1a1a' };
    return { ...base, background: tierColors[row] || '#1a1a1a', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' };
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(229,9,20,0.3)',
    borderRadius: 8, color: 'white',
    padding: '14px', width: '100%',
    fontSize: 14, outline: 'none',
    cursor: 'pointer',
    colorScheme: 'dark',
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0a 0%, #110000 100%)', px: { xs: 2, md: 6 }, py: 4 }}>

      <Typography variant="h4" fontWeight="900" color="white" mb={1}>{movie.title}</Typography>
      <Typography variant="body2" color="#666" mb={4}>Select your seats</Typography>

      {/* Date & Time */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>

        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CalendarToday sx={{ fontSize: 16, color: '#e50914' }} />
            <Typography variant="body2" color="#888">Select Date</Typography>
          </Box>
          <input
            type="date"
            style={inputStyle}
            min={getTodayIST()}
            value={showDate}
            onChange={e => setShowDate(e.target.value)}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccessTime sx={{ fontSize: 16, color: '#e50914' }} />
            <Typography variant="body2" color="#888">Select Time</Typography>
          </Box>
          <select style={inputStyle} value={showTime} onChange={e => setShowTime(e.target.value)}>
            <option value="" style={{ background: '#1a1a1a' }}>Choose showtime</option>
            {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'].map(t => (
              <option key={t} value={t} style={{ background: '#1a1a1a' }}>{t}</option>
            ))}
          </select>
        </Box>
      </Box>

      {/* Seat map */}
      <Card sx={{ background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'inline-block', px: 8, py: 1,
              background: 'linear-gradient(135deg, rgba(229,9,20,0.3), rgba(229,9,20,0.1))',
              border: '1px solid rgba(229,9,20,0.4)', borderRadius: 2,
              color: '#ff8a80', fontWeight: 700, fontSize: 13, letterSpacing: 2
            }}>
              ▬▬▬▬ SCREEN ▬▬▬▬
            </Box>
          </Box>

          {/* Price legend */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            {Object.entries(rowPrices).map(([row, price]) => (
              <Box key={row} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: 2, background: { A:'#1a3a1a', B:'#1a2a3a', C:'#2a2a1a', D:'#2a1a2a', E:'#3a1a1a' }[row] }} />
                <Typography variant="caption" color="#666">Row {row} — ₹{price}</Typography>
              </Box>
            ))}
          </Box>

          {/* Seats grid */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            {rows.map(row => (
              <Box key={row} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="#555" sx={{ width: 16, textAlign: 'right' }}>{row}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {cols.map(col => {
                    const seat = `${row}${col}`;
                    return (
                      <button key={seat} onClick={() => handleSeatClick(seat)}
                        disabled={bookedSeats.includes(seat)}
                        style={getSeatStyle(seat)}
                        title={`${seat} — ₹${seatPrice(seat)}`}>
                        {col}
                      </button>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Legend */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
            {[
              { color: '#2a2a2a', label: 'Booked' },
              { color: '#1a1a1a', label: 'Available', border: '1px solid rgba(255,255,255,0.1)' },
              { color: '#e50914', label: 'Selected' },
            ].map(({ color, label, border }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: 16, height: 16, borderRadius: 3, background: color, border: border || 'none' }} />
                <Typography variant="caption" color="#666">{label}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Bottom summary bar */}
      {selectedSeats.length > 0 && (
        <Card sx={{ mt: 3, background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="#666" mb={0.5}>Selected Seats</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedSeats.map(seat => (
                  <Chip key={seat} label={`${seat} ₹${seatPrice(seat)}`} size="small"
                    sx={{ background: 'rgba(229,9,20,0.2)', color: '#ff8a80', border: '1px solid rgba(229,9,20,0.4)', fontWeight: 700 }} />
                ))}
              </Box>
            </Box>
            <Box textAlign="right">
              <Typography variant="h5" fontWeight="900" color="white">₹{totalAmount}</Typography>
              <Button variant="contained" size="large"
                disabled={!showDate || !showTime}
                onClick={() => navigate("/summary", {
                  state: { movie, selectedSeats, total: totalAmount, showDate, showTime }
                })}
                sx={{
                  mt: 1, px: 4, fontWeight: 700,
                  background: 'linear-gradient(135deg, #e50914, #b20710)',
                  '&:hover': { background: 'linear-gradient(135deg, #ff1a1a, #e50914)' }
                }}>
                Continue →
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}