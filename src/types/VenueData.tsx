export interface DistanceRange {
    min: number; 
    max: number;  
    a: number;  
    b: number; 
    flag?: string | null; 
  }
  
  export interface VenueData {
    coordinates: [number, number]; 
    orderMinimumNoSurcharge: number; 
    baseDeliveryPrice: number; 
    distanceRanges: DistanceRange[]; 
  }