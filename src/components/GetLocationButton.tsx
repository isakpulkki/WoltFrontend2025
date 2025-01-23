import { Button, Box, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useState } from 'react';

const GetLocationButton = ({
  setMessage,
  setIsError,
  updateCoordinates,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  updateCoordinates: (lat: string, lon: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleLocationFetch = () => {
    setIsError(false);
    setLoading(true); //

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(14);
          const lon = position.coords.longitude.toFixed(14);
          updateCoordinates(lat, lon);
          setMessage('Location fetched successfully.');
          setLoading(false);
        },
        (error) => {
          setMessage('Error fetching the location.');
          console.log(error.message);
          setIsError(true);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ textTransform: 'none', width: '100%' }}
        startIcon={<LocationOnIcon />}
        onClick={handleLocationFetch}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: 'white', marginRight: 1 }} />
        ) : (
          'Get Location'
        )}
      </Button>
    </Box>
  );
};

export default GetLocationButton;
