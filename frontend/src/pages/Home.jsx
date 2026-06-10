import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { TextField, MenuItem, Box, Typography, InputAdornment } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 2,
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: '#e50914' },
    '&.Mui-focused fieldset': { borderColor: '#e50914' },
  },
  '& .MuiInputLabel-root': { color: '#888' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#e50914' },
  '& .MuiSelect-icon': { color: '#888' },
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const API_URL = "https://movie-booking-backend-96vw.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
      });
  }, []);

  const genres = ["All", ...new Set(movies.map(m => m.genre))];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "All" || movie.genre === genre)
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a', px: { xs: 2, md: 4 }, py: 4 }}>

      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" fontWeight="900" color="white" sx={{ lineHeight: 1.1 }}>
          Now Showing <span style={{ fontSize: '0.8em' }}>🎬</span>
        </Typography>
        <Typography variant="body1" color="#666" mt={1}>
          Book your favourite movies instantly!
        </Typography>
      </Box>

      {/* Search + Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          sx={{ flex: 3, minWidth: 200, ...inputStyles }}
          label="Search movies..." variant="outlined"
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#666' }} /></InputAdornment>
          }}
        />
        <TextField
          select sx={{ flex: 1, minWidth: 160, ...inputStyles }}
          label="Genre" value={genre} onChange={e => setGenre(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><FilterList sx={{ color: '#666' }} /></InputAdornment>
          }}
        >
          {genres.map(g => (
            <MenuItem key={g} value={g} sx={{ background: '#1a1a1a', color: 'white', '&:hover': { background: 'rgba(229,9,20,0.15)' } }}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Movie Grid */}
      {filteredMovies.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="#444">No movies found</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 3 }}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
}