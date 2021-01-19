import { Weather } from '../entities/weatherEntities';
import { getCityWeatherByDate, parseWeather } from '../../adapters/weather';

export const fetchWeather = (cityName: string, date: string): Promise<Weather> => {
  return getCityWeatherByDate(cityName, date).then(parseWeather);
};
