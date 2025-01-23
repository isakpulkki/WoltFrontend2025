import { TextField, Box } from '@mui/material';

interface CoordinateInputProps {
  label: string;
  range: { min: number; max: number };
  value: string;
  onChange: (value: string) => void;
  dataTestId: string;
}

const CoordinateInput = ({
  label,
  range,
  value,
  onChange,
  dataTestId,
}: CoordinateInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    const regex = /^[-]?\d*\.?\d*$/;
    if (regex.test(newValue)) {
      const numericValue = parseFloat(newValue);
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
        const truncatedValue = numericValue.toFixed(14);
        onChange(truncatedValue);
      }
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        variant="filled"
        value={value}
        inputProps={{ 'data-test-id': dataTestId }}
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
