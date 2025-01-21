import { TextField, Box } from '@mui/material';

const VenueSlugInput = ({
  setMessage,
  setIsError,
  setVenueSlug,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setVenueSlug: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      setMessage('Venue Slug is too long!');
      setIsError(true);
    } else {
      setMessage('');
      setIsError(false);
      setVenueSlug(value); 
    }
  };

  return (
    <Box>
      <TextField
        label="Venue Slug"
        variant="filled"
        data-test-id="venueSlug"
        sx={{ width: '100%' }}
        required
        onChange={handleChange}
      />
    </Box>
  );
};

export default VenueSlugInput;