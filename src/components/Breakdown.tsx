// src/components/Breakdown.tsx
import { CalculationResult } from '../types/CalculationResult';
import { Typography, Paper } from '@mui/material';

const Breakdown = ({ prices }: { prices: CalculationResult }) => {
  return (
    <Paper sx={{ padding: 2, marginTop: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Price Breakdown
      </Typography>
      <Typography>
        <span style={{ fontWeight: 'bold' }}>Cart Value</span> {prices.cartValue} €
      </Typography>
      <Typography>
        <span style={{ fontWeight: 'bold' }}>Small Order Surcharge</span> {prices.smallOrderSurcharge} €
      </Typography>
      <Typography>
        <span style={{ fontWeight: 'bold' }}>Delivery Fee</span> {prices.deliveryFee} €
      </Typography>
      <Typography>
        <span style={{ fontWeight: 'bold' }}>Delivery Distance</span> {prices.deliveryDistance} meters
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        <span style={{ fontWeight: 'bold' }}>Total Price</span> {prices.totalPrice} €
      </Typography>
    </Paper>
  );
};

export default Breakdown;