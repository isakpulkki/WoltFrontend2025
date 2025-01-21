import { Button, Box } from '@mui/material';

const SubmitButton = ({
  setMessage,
  setIsError,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Box>
    <Button
      variant="contained"
      color="primary"
      sx={{
        textTransform: 'none',
        width: '100%',
      }}
      onClick={(e) => {
        e.preventDefault();
        setMessage("'Calculate' -button clicked!");
        setIsError(false);
      }}
    >
      Calculate
    </Button>
  </Box>
);

export default SubmitButton;
