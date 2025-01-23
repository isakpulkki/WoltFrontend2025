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
import Breakdown from './components/Breakdown';
import { CalculationResult } from './types/CalculationResult';

function App() {
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [venueSlug, setVenueSlug] = useState<string>('');
  const [cartValue, setCartValue] = useState<string>('');
  const [prices, setPrices] = useState<CalculationResult | null>(null); 

  const updateCoordinates = (lat: string, lon: string) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#21b9e7',
        light: '#21b9e7',
      },
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
          dataTestId={'userLatitude'}
        />
        <CoordinateInput
          label="User Longitude"
          range={{ min: -180, max: 180 }}
          value={longitude}
          onChange={setLongitude}
          dataTestId={'userLongitude'}
        />
        <GetLocationButton
          setMessage={setMessage}
          setIsError={setIsError}
          updateCoordinates={updateCoordinates}
        />
        <SubmitButton
          venueSlug={venueSlug}
          cartValue={cartValue}
          latitude={latitude}
          longitude={longitude}
          setMessage={setMessage}
          setIsError={setIsError}
          setPrices={setPrices} 
        />
        {message && <Message message={message} setMessage={setMessage} isError={isError} />}
        {prices && <Breakdown prices={prices} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;