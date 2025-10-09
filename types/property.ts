export interface PropertyImage {
  url: string;
  alt: string;
  order: number;
}

export interface Property {
  id: string;
  listing_id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: string;
  listing_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  agency_fee: number;
  images: PropertyImage[];
  features: string[];
  created_at: string;
  updated_at?: string;
}
