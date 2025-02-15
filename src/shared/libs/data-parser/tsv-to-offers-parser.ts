import {
  Offer,
  User,
  UserType,
  City,
  AccommodationCategory,
  Amenity,
  LngLat,
  TSVRecord
} from '../../types/index.js';
import { DataParser } from './data-parser.interface.js';

const RAW_VALUE_SEPARATOR = ',';
const TRUE_STRING = String(true);

export class TSVToOffersParser implements DataParser<TSVRecord[], Offer[]> {
  public parse(rawRecords: TSVRecord[]): Offer[] {
    return rawRecords.map((rawRecord) => this.parseRecord(rawRecord));
  }

  private parseRecord(rawRecord: TSVRecord): Offer {
    const [
      name,
      description,
      author,
      postDate,

      preview,
      photos,

      city,
      lngLat,

      accommodationCategory,
      amenities,

      rentalPrice,
      roomsQuantity,
      guestsQuantity,
      commentsCount,
      rating,

      isPremium,
      isFavorite
    ] = rawRecord;

    return {
      name,
      description,
      author: this.parseUser(author),
      postDate: this.parseDate(postDate),

      preview,
      photos: this.parsePhotos(photos),

      city: this.parseCity(city),
      lngLat: this.parseLngLat(lngLat),

      accommodationCategory: this.parseAccommodationCategory(accommodationCategory),
      amenities: this.parseAmenities(amenities),

      rentalPrice: this.parseFloat(rentalPrice),
      roomsQuantity: this.parseInt(roomsQuantity),
      guestsQuantity: this.parseInt(guestsQuantity),
      commentsCount: this.parseInt(commentsCount),
      rating: this.parseFloat(rating),

      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite)
    };
  }

  private parseUser(rawValue: string): User {
    const [
      type,
      name,
      email,
      password,
      avatar
    ] = rawValue.split(RAW_VALUE_SEPARATOR);

    return {
      type: type as UserType,
      name,
      email,
      password,
      avatar
    };
  }

  private parseDate(rawValue: string): Date {
    return new Date(rawValue);
  }

  private parsePhotos(rawValue: string): string[] {
    return rawValue.split(RAW_VALUE_SEPARATOR);
  }

  private parseCity(rawValue: string): City {
    const [name, lng, lat] = rawValue.split(RAW_VALUE_SEPARATOR);

    return {
      name,
      lngLat: this.parseLngLat(`${lng}${RAW_VALUE_SEPARATOR}${lat}`)
    };
  }

  private parseLngLat(rawValue: string): LngLat {
    const [lng, lat] = rawValue.split(RAW_VALUE_SEPARATOR).map(this.parseFloat);
    return { lng, lat };
  }

  private parseAccommodationCategory(rawValue: string): AccommodationCategory {
    return { name: rawValue };
  }

  private parseAmenities(rawValue: string): Amenity[] {
    return rawValue.split(RAW_VALUE_SEPARATOR).map((name) => ({ name }));
  }

  private parseInt(rawValue: string): number {
    return parseInt(rawValue, 10);
  }

  private parseFloat(rawValue: string): number {
    return parseFloat(rawValue);
  }

  private parseBoolean(rawValue: string): boolean {
    return rawValue === TRUE_STRING;
  }
}
