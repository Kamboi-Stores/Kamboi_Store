export interface LocationHours {
  day: string;
  open: string;
  close: string;
}

export interface Location {
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
  phone?: string;
  hours?: LocationHours[];
  orderUrl?: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  dietaryTags?: string[];
  isFeatured?: boolean;
  img?: string;
}

export interface MenuCategory {
  name: string;
  slug: string;
  items: MenuItem[];
}
