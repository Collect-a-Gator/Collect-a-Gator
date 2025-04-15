import { StaticImageData } from "next/image";

export interface PlaceDetails {
    latitude: number;
    longitude: number;
    category: string;
    title: string;
    image: StaticImageData; 
  }