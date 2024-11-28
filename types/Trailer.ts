type TrailerStatus = "available" | "reserved" | "unavailable";

interface Trailer {
  id: number;
  name: string;
  description: string;
  height: number;
  width: number;
  year_of_production: string;
  color: string;
  max_weight: number;
  curb_weight: number;
  deposit: number;
  slug: string;
  price_1: number;
  price_2: number;
  price_3: number;
  status: TrailerStatus;
}
