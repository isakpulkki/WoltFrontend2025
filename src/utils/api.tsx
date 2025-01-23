import { VenueData } from '../types/VenueData';

export const fetchVenueData = async (
  venueSlug: string,
  setMessage: (message: string) => void,
  setIsError: (isError: boolean) => void 
): Promise<VenueData> => {
  try {
    const staticApiUrl = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`;
    const dynamicApiUrl = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`;
    const [staticResponse, dynamicResponse] = await Promise.all([
      fetch(staticApiUrl),
      fetch(dynamicApiUrl),
    ]);

    if (!staticResponse.ok) {
      const errorMessage = 'Error fetching the venues data.';
      setMessage(errorMessage);
      setIsError(true); 
      throw new Error(errorMessage);
    }

    if (!dynamicResponse.ok) {
      const errorMessage = 'Error fetching the venues data.';
      setMessage(errorMessage);
      setIsError(true); 
      throw new Error(errorMessage);
    }

    const staticData = await staticResponse.json();
    const dynamicData = await dynamicResponse.json();
    const venueData: VenueData = {
      coordinates: staticData.venue_raw.location.coordinates,
      orderMinimumNoSurcharge:
        dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge,
      baseDeliveryPrice:
        dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price,
      distanceRanges:
        dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges,
    };

    setIsError(false);
    return venueData;
  } catch (error) {
    setIsError(true); 
    if (error instanceof Error) {
      console.error('Error fetching venue data: ', error.message);
      setMessage('Error occured, is the venue slug typed correctly?');
      throw new Error(error.message);
    } else {
      const unexpectedError = 'An unexpected error occurred.';
      console.error(unexpectedError, error);
      setMessage(unexpectedError);
      throw new Error(unexpectedError);
    }
  }
};