import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Star, AccessTime, ConfirmationNumber } from "@mui/icons-material";

import animal from '../assets/animal.jpg';
import haq from '../assets/haq.jpg';
import madagascar from '../assets/madagascar.jpg';
import metroindino from '../assets/metroindino.jpg';
import peoplewemeet from '../assets/peoplewemeet.jpg';
import toalltheboys from '../assets/toalltheboys.jpg';

const posterMap = {
  'animal.jpg': animal,
  'haq.jpg': haq,
  'madagascar.jpg': madagascar,
  'metroindino.jpg': metroindino,
  'peoplewemeet.jpg': peoplewemeet,
  'toalltheboys.jpg': toalltheboys,
  // also support without extension in case DB stores it that way
  'animal': animal,
  'haq': haq,
  'madagascar': madagascar,
  'metroindino': metroindino,
  'peoplewemeet': peoplewemeet,
  'toalltheboys': toalltheboys,
};

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const fallbackPoster = `https://placehold.co/400x560/1a0000/e50914?text=${encodeURIComponent(movie.title)}`;
  const posterSrc = imgError
    ? fallbackPoster
    : (posterMap[movie.poster] || posterMap[movie.posterUrl] || fallbackPoster);

  return (
    <Card sx={{
      background: 'rgba(18,18,18,0.95)',
      border: '1px solid rgba(229,9,20,0.2)',
      borderRadius: 3,
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid rgba(229,9,20,0.6)',
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 40px rgba(229,9,20,0.2)',
      }
    }}>
      {/* Poster */}
      <div style={{ position: 'relative', paddingTop: '140%', overflow: 'hidden' }}>
        <img
          src={posterSrc}
          alt={movie.title}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))'
        }} />
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(229,9,20,0.5)',
          borderRadius: 20, padding: '3px 10px',
          display: 'flex', alignItems: 'center', gap: 4
        }}>
          <Star sx={{ fontSize: 13, color: '#FFD700' }} />
          <Typography variant="caption" fontWeight="700" color="white">{movie.rating}</Typography>
        </div>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <Chip label={movie.language} size="small"
            sx={{ background: 'rgba(229,9,20,0.85)', color: 'white', fontWeight: 700, fontSize: 10, height: 22 }} />
        </div>
      </div>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, gap: 0.5 }}>
        <Typography variant="h6" fontWeight="900" color="white" sx={{
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          lineHeight: 1.3, mb: 0.5
        }}>
          {movie.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}>
          {movie.genre}
        </Typography>

        <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <AccessTime sx={{ fontSize: 13 }} /> {movie.duration}
          </Typography>
          <Typography variant="caption" sx={{ color: '#ff8a80', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
            <ConfirmationNumber sx={{ fontSize: 13 }} /> ₹{movie.price}
          </Typography>
        </div>

        <Button
          fullWidth variant="contained"
          onClick={() => navigate(`/movie/${movie._id}`)}
          sx={{
            mt: 'auto', py: 1.2, fontWeight: 700, fontSize: '0.85rem',
            background: 'linear-gradient(135deg, #e50914, #b20710)',
            borderRadius: 2,
            '&:hover': { background: 'linear-gradient(135deg, #ff1a1a, #e50914)' }
          }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}