import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  LocalMovies,
  EventSeat,
  CalendarToday,
  AccessTime,
  CurrencyRupee,
  Cancel
} from "@mui/icons-material";

export default function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(
        "https://movie-booking-backend-96vw.onrender.com/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load bookings:", err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(
        `https://movie-booking-backend-96vw.onrender.com/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await axios.get(
        "https://movie-booking-backend-96vw.onrender.com/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0a 0%, #110000 100%)",
        px: { xs: 2, md: 6 },
        py: 5
      }}
    >
      <Typography
        variant="h4"
        fontWeight="900"
        color="white"
        mb={4}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <LocalMovies sx={{ color: "#e50914" }} />
        Booking History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress sx={{ color: "#e50914" }} />
        </Box>
      ) : bookings.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <LocalMovies
            sx={{
              fontSize: 64,
              color: "rgba(229,9,20,0.3)",
              mb: 2
            }}
          />
          <Typography variant="h6" color="#555">
            No bookings yet
          </Typography>
          <Typography variant="body2" color="#444" mt={1}>
            Your movie ticket bookings will appear here
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 700
          }}
        >
          {bookings.map((b) => (
            <Card
              key={b._id}
              sx={{
                background: "rgba(20,20,20,0.95)",
                border: "1px solid rgba(229,9,20,0.2)",
                borderRadius: 3,
                transition: "border 0.2s",
                "&:hover": {
                  border: "1px solid rgba(229,9,20,0.5)"
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    color="white"
                  >
                    {b.movieTitle}
                  </Typography>

                  <Chip
                    label={`₹${b.totalAmount}`}
                    sx={{
                      background: "rgba(229,9,20,0.2)",
                      color: "#ff8a80",
                      border: "1px solid rgba(229,9,20,0.4)",
                      fontWeight: 700
                    }}
                  />
                </Box>

                <Divider
                  sx={{
                    borderColor: "rgba(255,255,255,0.06)",
                    mb: 2
                  }}
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1.5,
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <EventSeat
                      sx={{
                        fontSize: 16,
                        color: "#e50914"
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="#555">
                        Seats
                      </Typography>
                      <Typography variant="body2" color="white">
                        {b.seats.join(", ")}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <CalendarToday
                      sx={{
                        fontSize: 16,
                        color: "#e50914"
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="#555">
                        Date
                      </Typography>
                      <Typography variant="body2" color="white">
                        {b.showDate}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <AccessTime
                      sx={{
                        fontSize: 16,
                        color: "#e50914"
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="#555">
                        Time
                      </Typography>
                      <Typography variant="body2" color="white">
                        {b.showTime}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <CurrencyRupee
                      sx={{
                        fontSize: 16,
                        color: "#e50914"
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="#555">
                        Amount
                      </Typography>
                      <Typography
                        variant="body2"
                        color="white"
                        fontWeight="700"
                      >
                        ₹{b.totalAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Cancel />}
                  onClick={() => handleCancel(b._id)}
                  sx={{
                    borderColor: "rgba(229,9,20,0.4)",
                    color: "#ff6b6b",
                    "&:hover": {
                      borderColor: "#e50914",
                      background: "rgba(229,9,20,0.1)"
                    }
                  }}
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}