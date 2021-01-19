import { ResponseData } from '../ports/http/http.types';
import { Weather, WeatherRaw } from '../domain/entities/weatherEntities';
import { makeRequest, handleResponse } from '../ports/http/index';

const CACHE: Record<string, ResponseData<WeatherRaw>> = {};

export const getCityWeatherByDate = async (city: string, date: string): Promise<ResponseData<WeatherRaw>> => {
  // @ts-ignore
  const apiKey = WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}&end_dt=${date}&days=1`;
  if (url in CACHE) {
    return CACHE[url];
  }

  const response = await makeRequest(url);
  const data = await handleResponse<WeatherRaw>(response);
  if (data.isSuccessful) {
    CACHE[url] = data;
  }

  return data;
};

export const parseWeather = ({ data, isSuccessful }: ResponseData<WeatherRaw>): Weather => {
  if (isSuccessful && data?.forecast.forecastday.length) {
    const [weather] = data?.forecast.forecastday;
    const { text, code, icon } = weather.day.condition;
    return { text, code, icon };
  }

  return {
    text: 'N/D',
    icon: 'N/D',
    code: 0,
  };
};
