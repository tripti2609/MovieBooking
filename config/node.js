const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ✅ Dummy movie data (replace with your own if needed)
const movies = [
  {
    title: "Sholay",
    duration: 204,
    language: "Hindi",
    genre: "Action",
    poster_url: "https://example.com/sholay.jpg"
  },
  {
    title: "Inception",
    duration: 148,
    language: "English",
    genre: "Sci-Fi",
    poster_url: "https://example.com/inception.jpg"
  }
];

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.listen(8085, () => console.log("Server running on port 8085"));
