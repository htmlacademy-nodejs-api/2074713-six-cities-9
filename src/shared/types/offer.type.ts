import { User } from './user.type.js';
import { City } from './city.type.js';
import { AccommodationCategory } from './accommodation-category.type.js';
import { Amenity } from './amenity.type.js';
import { LngLat } from './lng-lat.type.js';

export type Offer = {
  name: string;
  description: string;
  author: User;
  postDate: Date;

  preview: string;
  photos: string[];

  city: City;
  lngLat: LngLat;

  accommodationCategory: AccommodationCategory;
  amenities: Amenity[];

  rentalPrice: number;
  roomsQuantity: number;
  guestsQuantity: number;
  commentsCount: number;
  rating: number;

  isPremium: boolean;
  isFavorite: boolean;
}
