import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import posters from "../data/posters";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const fallbackPoster =
    "https://via.placeholder.com/500x750.png?text=Poster+Not+Available";

  return (
    <Card className="glass-card shadow h-100">
      {/* Poster */}
      <div className="poster-wrap">
        <img
          src={imgError ? fallbackPoster : posters[movie.poster]}
          alt={movie.title}
          className="poster-img"
          onError={() => setImgError(true)}
        />
        <div className="badge-rating">⭐ {movie.rating}</div>
        <div className="poster-overlay"></div>
      </div>

      {/* Content */}
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          height: "190px"
        }}
      >
        <Typography
          variant="h6"
          fontWeight="900"
          style={{
            color: "white",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {movie.title}
        </Typography>

        <Typography variant="body2" style={{ color: "rgba(255,255,255,0.75)" }}>
          {movie.genre} • {movie.language}
        </Typography>

        <Typography
          variant="body2"
          style={{ color: "rgba(255,255,255,0.65)", marginTop: "6px" }}
        >
          ⏱ {movie.duration} • 🎟 ₹{movie.price}
        </Typography>

        {/* Button */}
        <div style={{ marginTop: "auto" }}>
          <Button
            fullWidth
            className="neon-btn mt-3"
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}