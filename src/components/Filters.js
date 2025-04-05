import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const genres = ['Action', 'Drama', 'Sci-Fi', 'Comedy'];
const artists = ['Actor A', 'Actor B', 'Actress C'];

const Filters = () => (
  <div style={{ padding: 20, border: '1px solid lightgray', borderRadius: 5 }}>
    <Typography variant="h6" gutterBottom>
      FIND MOVIES BY:
    </Typography>

    <TextField fullWidth label="Movie Name" margin="dense" />

    <TextField
      select
      fullWidth
      label="Genres"
      margin="dense"
      defaultValue=""
    >
      {genres.map((genre, idx) => (
        <MenuItem key={idx} value={genre}>
          {genre}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      fullWidth
      label="Artists"
      margin="dense"
      defaultValue=""
    >
      {artists.map((artist, idx) => (
        <MenuItem key={idx} value={artist}>
          {artist}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      fullWidth
      label="Release Date Start"
      type="date"
      InputLabelProps={{ shrink: true }}
      margin="dense"
    />
    <TextField
      fullWidth
      label="Release Date End"
      type="date"
      InputLabelProps={{ shrink: true }}
      margin="dense"
    />

    <Button variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
      APPLY
    </Button>
  </div>
);

export default Filters;
