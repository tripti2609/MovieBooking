// src/components/Home.js
import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import './home.css';
import MovieList from './components/MovieList'; 
import LoginForm from './LoginForm';

const Home = () => {
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    genres: '',
    artists: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Fetch released movies
    api.get('/movies?status=RELEASED')
      .then((res) => {
        setReleasedMovies(res.data);
      })
      .catch((err) => console.error('Error fetching released movies:', err));

    // Fetch upcoming movies
    api.get('/movies?status=PUBLISHED')
      .then((res) => {
        setUpcomingMovies(res.data);
      })
      .catch((err) => console.error('Error fetching upcoming movies:', err));
  }, []);

  return (
    <div className="home">
      {/* Upcoming Movies Section */}
      <div className="upcoming-movies">
        <h3>Upcoming Movies</h3>
        <div className="movie-strip">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster_url} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Released Movies Section */}
      <div className="released-movies">
        {releasedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster_url} alt={movie.title} />
            <p>{movie.title}</p>
            <p>Release Date: {new Date(movie.release_date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <header>
        <button onClick={() => setOpenLogin(true)}>Login</button>
      </header>

      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <div style={{ background: 'white', padding: 20, margin: '10% auto', width: 300 }}>
          <LoginForm onLoginSuccess={() => setOpenLogin(false)} />
        </div>
      </Modal>
    </>
  );
};
export default Home;
