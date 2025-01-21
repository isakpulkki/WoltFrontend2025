import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const CartValueInput = ({
  setCartValue,
}: {
  setCartValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [cartValue, setCartValueState] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^0[0-9]/.test(value)) {
      value = value.replace(/^0[0-9]/, '');
    }
    const decimalRegex = /^\d*\.?\d{0,2}$/;

    if (decimalRegex.test(value)) {
      setCartValueState(value);
      setCartValue(value);
    }
  };

  return (
    <Box>
      <TextField
        label="Cart Value (€)"
        variant="filled"
        sx={{ width: '100%' }}
        type="text"
        value={cartValue}
        onChange={handleChange}
        data-test-id="cartValue"
        required
        helperText="Enter the cart value in EUR"
      />
    </Box>
  );
};

export default CartValueInput;
