import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../src/components/MovieCard'; // Make sure the path is correct
const movies = await movies.find(); // This is good

const MovieController = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Replace the URL with your actual backend API endpoint
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} showReleaseDate={true} />
      ))}
    </div>
  );
};

export default MovieController;
