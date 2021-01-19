import { getCitiesByName, parseCities } from '../../adapters/city';
import { City } from '../entities/cityEntities';

export const fetchCities = (cityName: string): Promise<City[]> => {
  if (!cityName) Promise.resolve([]);
  return getCitiesByName(cityName).then(parseCities);
};
