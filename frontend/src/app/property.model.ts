import { PropertyOwner } from "./property-owner.model";

export interface Property {
  id: string;
  owner: PropertyOwner[];
  rent: number;
  contact:number;
  area: string;
  place: string;
  amenities: string[];
  status: 'Available' | 'Occupied';
}
