export type CityRaw = {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: string;
  longitude: string;
};

export type City = {
  id: number;
  city: string;
  country: string;
};
