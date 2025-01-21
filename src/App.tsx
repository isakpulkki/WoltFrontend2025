import {
  CssBaseline,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useState } from 'react';
import VenueSlugInput from './components/VenueSlugInput';
import CartValueInput from './components/CartValueInput';
import CoordinateInput from './components/CoordinateInput';
import GetLocationButton from './components/GetLocationButton';
import SubmitButton from './components/SubmitButton';
import Message from './components/Message';

function App() {
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [, setVenueSlug] = useState<string>('');
  const [, setCartValue] = useState<string>('');
  const updateCoordinates = (lat: string, lon: string) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  // Define the dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          padding: 2,
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Delivery Order Price Calculator
        </Typography>
        <VenueSlugInput
          setMessage={setMessage}
          setIsError={setIsError}
          setVenueSlug={setVenueSlug}
        />
        <CartValueInput setCartValue={setCartValue} />
        <CoordinateInput
          label="User Latitude"
          range={{ min: -90, max: 90 }}
          value={latitude}
          onChange={setLatitude}
        />
        <CoordinateInput
          label="User Longitude"
          range={{ min: -180, max: 180 }}
          value={longitude}
          onChange={setLongitude}
        />
        <GetLocationButton
          setMessage={setMessage}
          setIsError={setIsError}
          updateCoordinates={updateCoordinates}
        />
        <SubmitButton setMessage={setMessage} setIsError={setIsError} />
        {message && <Message message={message} isError={isError} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
