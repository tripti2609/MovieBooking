const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const movieRoutes = require('./routes/movie.routes');
const artistRoutes = require('./routes/artist.routes');
const genreRoutes = require('./routes/genre.routes');
const userRoutes = require('./routes/user.routes');
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/moviesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
  // ✅ Define Movie Schema
  const movieSchema = new mongoose.Schema({
    _id : String,
    movieid : Number,
    title : String, 
    published : Boolean,
    released : Boolean,
    poster_url : String,
    release_date : Date,
    publish_date : Date,
    genres : String,
    duration : Number,
    critic_rating : Number,
    trailer_url : String,
    wiki_url : String,
    story_line : String,
  });
  
  // ✅ Create Model
  const Movie = mongoose.model("movies", movieSchema);
  
  // ✅ Define the /api/movies endpoint
  app.get("/api/movies", async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch movies" });
    }
  });

app.use('/api/movies', movieRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/users', userRoutes);

// Start Server
const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
