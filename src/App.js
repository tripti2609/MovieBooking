import React from 'react';
import './App.css';
import Header from './components/Header';
import Filters from './components/Filters';
import MovieCard from './components/MovieCard';

const upcomingMovies = [
  { id: 1, title: 'The Lodgers', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Hannah', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'The Chamber', image: 'https://via.placeholder.com/150' },
];

const releasedMovies = [
  { id: 1, title: 'The Lodgers', image: 'https://via.placeholder.com/150', releaseDate: 'Wed Jan 01 2020' },
  { id: 2, title: 'Beast of Burden', image: 'https://via.placeholder.com/150', releaseDate: 'Wed Jan 01 2020' },
  { id: 3, title: 'The Chamber', image: 'https://via.placeholder.com/150', releaseDate: 'Wed Jan 01 2020' },
];

function App() {
  return (
    <div>
      <Header />

      <div className="upcoming-movies-strip">
        Upcoming Movies
      </div>

      <div className="upcoming-movies">
        {upcomingMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="main-content">
        <div className="released-movies">
          {releasedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} showReleaseDate />
          ))}
        </div>

        <div className="filters">
          <Filters />
        </div>
      </div>
    </div>
  );
}

export default App;
