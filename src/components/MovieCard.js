import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const MovieCard = ({ movie, showReleaseDate }) => {
  console.log("Poster URL:", movie.poster_url);

  return (
    <Card style={{ width: 150, margin: 10 }}>
      <CardMedia
  component="img"
  alt={movie.title}
  height="200"
  image={movie.posterUrl || "/fallback.png"}
/>
      <CardContent>
        <Typography variant="body1">{movie.title}</Typography>
        {showReleaseDate && (
          <Typography variant="body2" color="textSecondary">
            Release Date: {movie.releaseDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
