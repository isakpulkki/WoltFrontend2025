import { Box, Typography } from '@mui/material';

const Message = ({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) => (
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

export default Message;
