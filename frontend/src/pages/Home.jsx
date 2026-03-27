import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { TextField, MenuItem } from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5001/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "All" || movie.genre === genre)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="page-title">Now Showing 🎬</h2>
      <p className="sub-text">Book your favourite movies instantly!</p>

      {/* Search + Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <TextField
            fullWidth
            label="Search Movie..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <TextField
            select
            fullWidth
            label="Filter by Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Action/Drama">Action/Drama</MenuItem>
            <MenuItem value="Romance/Comedy">Romance/Comedy</MenuItem>
            <MenuItem value="Animation/Comedy">Animation/Comedy</MenuItem>
            <MenuItem value="Drama/Romance">Drama/Romance</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="row">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="col-md-3 mb-4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}