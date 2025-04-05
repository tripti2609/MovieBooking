// MovieList.js (example)
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/movies") // Adjust to your endpoint
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movies", err));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} showReleaseDate />
      ))}
    </div>
  );
};

export default MovieList;
