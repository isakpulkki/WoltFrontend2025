import { CalculatePrice } from './calculator';
import { VenueData } from '../types/VenueData';
import { CalculationResult } from '../types/CalculationResult';

describe('Calculating price...', () => {
  const venueData: VenueData = {
    coordinates: [77.5956, 12.9756],
    baseDeliveryPrice: 200,
    orderMinimumNoSurcharge: 1000,
    distanceRanges: [
      { min: 0, max: 500, a: 0, b: 0, flag: null },
      { min: 500, max: 1000, a: 100, b: 1, flag: null },
      { min: 1000, max: 0, a: 0, b: 0, flag: null },
    ],
  };

  test('...Should calculate delivery fee and total price for valid input.', () => {
    const cartValue = "15.00";
    const latitude = 12.9756;
    const longitude = 77.5956;
    
    const result: CalculationResult = CalculatePrice(venueData, cartValue, latitude, longitude);

    expect(result.cartValue).toBe('15.00');
    expect(result.smallOrderSurcharge).toBe('0.00');
    expect(result.deliveryFee).toBe('2.00');
    expect(Number(result.deliveryDistance)).toBe(0);
    expect(result.totalPrice).toBe('17.00');
  });

  test('...Should apply small order surcharge if cart value is below minimum.', () => {
    const cartValue = "8.00";
    const latitude = 12.9756;
    const longitude = 77.5956;
    
    const result: CalculationResult = CalculatePrice(venueData, cartValue, latitude, longitude);

    expect(result.cartValue).toBe('8.00');
    expect(result.smallOrderSurcharge).toBe('2.00');
    expect(result.deliveryFee).toBe('2.00');
    expect(result.totalPrice).toBe('12.00');
  });

  test('...Should return error if delivery is too far away.', () => {
    const cartValue = "15.00";
    const latitude = 13.9756;
    const longitude = 77.5956;

    const result: CalculationResult = CalculatePrice(venueData, cartValue, latitude, longitude);

    expect(result.error).toBe('Delivery not possible, distance too far.');
  });

  test('...Should correctly calculate distance-based fees for larger distances.', () => {
    const cartValue = "15.00";
    const latitude = 12.9800;
    const longitude = 77.5900;

    const result: CalculationResult = CalculatePrice(venueData, cartValue, latitude, longitude);
    expect(result.cartValue).toBe('15.00');
    expect(result.smallOrderSurcharge).toBe('0.00');
    expect(Number(result.deliveryFee)).toBeGreaterThan(2.00);
    expect(Number(result.totalPrice)).toBeGreaterThan(17.00);
  });
});