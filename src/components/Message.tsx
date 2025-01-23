import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const Message = ({
  message,
  setMessage,
  isError,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>; 
  isError: boolean;
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(''); 
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <Box>
      <Typography
        variant="body1"
        color={isError ? 'error' : 'success.main'}
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Message;