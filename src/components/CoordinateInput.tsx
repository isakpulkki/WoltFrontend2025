import { TextField, Box } from '@mui/material';

interface CoordinateInputProps {
  label: string;
  range: { min: number; max: number }; // For latitude or longitude range
  value: string;
  onChange: (value: string) => void;
}

const CoordinateInput = ({
  label,
  range,
  value,
  onChange,
}: CoordinateInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    const regex = /^[-]?\d*\.?\d{0,14}$/;
    if (regex.test(newValue)) {
      const numericValue = parseFloat(newValue);

      // Ensure the value is within the valid range
      if (
        newValue === '' ||
        newValue === '-' ||
        (numericValue >= range.min && numericValue <= range.max)
      ) {
        newValue = newValue.replace(/^(-?)(0+)(\d)/, '$1$3');
        onChange(newValue);
      }
    }
  };

  const handleBlur = () => {
    if (value !== '') {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toFixed(14);
        onChange(formattedValue);
      }
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        variant="filled"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: '100%' }}
        required
        helperText={`Value must be between ${range.min}° and ${range.max}°`}
      />
    </Box>
  );
};

export default CoordinateInput;
