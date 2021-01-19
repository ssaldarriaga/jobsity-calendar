type WeatherDay = {
  date: string;
  date_epoch: number;
  day: {
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
};

export type WeatherRaw = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: WeatherDay[];
  };
};

export type Weather = {
  text: string;
  icon: string;
  code: number;
};
