// src/components/SubmitButton.tsx
import { Button, Box } from '@mui/material';
import { fetchVenueData } from '../utils/api';
import { CalculatePrice } from '../utils/calculator';
import { VenueData } from '../types/VenueData';
import { CalculationResult } from '../types/CalculationResult';

const SubmitButton = ({
  venueSlug,
  cartValue,
  latitude,
  longitude,
  setMessage,
  setIsError,
  setPrices,
}: {
  venueSlug: string;
  cartValue: string;
  latitude: string;
  longitude: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setPrices: React.Dispatch<React.SetStateAction<CalculationResult | null>>;
}) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!venueSlug || !cartValue || !latitude || !longitude) {
      setMessage('Please fill in all fields.');
      setIsError(true);
      return;
    }

    const venueData: VenueData = await fetchVenueData(
      venueSlug,
      setMessage,
      setIsError
    );
    const result: CalculationResult = CalculatePrice(
      venueData,
      cartValue,
      parseFloat(latitude),
      parseFloat(longitude)
    );

    if (result.error) {
      setMessage(result.error);
      setIsError(true);
      setPrices(null);
    } else {
      setPrices(result);
      setIsError(false);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          width: '100%',
        }}
        onClick={handleClick}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default SubmitButton;
