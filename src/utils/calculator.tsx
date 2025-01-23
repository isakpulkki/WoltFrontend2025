import { VenueData } from '../types/VenueData';
import { CalculationResult } from '../types/CalculationResult';
import { getDistance } from 'geolib';

export const CalculatePrice = (
    venueData: VenueData,
    cartValue: string,
    latitude: number,
    longitude: number
  ): CalculationResult | { error: string } => {
    const cart = parseFloat(cartValue) * 100;
    const distance = Math.round(
      calculateDistance(venueData.coordinates, latitude, longitude)
    );
    const basePrice = venueData.baseDeliveryPrice;
  
    const smallOrderSurcharge =
      cart < venueData.orderMinimumNoSurcharge
        ? venueData.orderMinimumNoSurcharge - cart
        : 0;
  
    let deliveryFee = basePrice;
  
    for (const range of venueData.distanceRanges) {
      if (distance >= range.min && (distance < range.max || range.max === 0)) {
        if (distance >= range.min && range.max === 0) {
          return { error: 'Delivery not possible, distance too far.',  };
        }
        const distanceBasedFee = Math.round((range.b * distance) / 10);
        deliveryFee += range.a + distanceBasedFee;
        break;
      }
    }
  
    const totalPrice = cart + smallOrderSurcharge + deliveryFee;
  
    return {
      cartValue: (cart / 100).toFixed(2),
      smallOrderSurcharge: (smallOrderSurcharge / 100).toFixed(2),
      deliveryFee: (deliveryFee / 100).toFixed(2),
      deliveryDistance: distance,
      totalPrice: (totalPrice / 100).toFixed(2),
    };
  };
  
  const calculateDistance = (
    venueCoords: [number, number],
    userLatitude: number,
    userLongitude: number
  ): number => {
    const [venueLongitude, venueLatitude] = venueCoords;
  
    return getDistance(
      { latitude: venueLatitude, longitude: venueLongitude },
      { latitude: userLatitude, longitude: userLongitude }
    );
  };