const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.addMovie = async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
};