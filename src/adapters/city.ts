import { ResponseData } from '../ports/http/http.types';
import { City, CityRaw } from '../domain/entities/cityEntities';
import { makeRequest, handleResponse } from '../ports/http/index';

let signal: AbortSignal;
let controller: AbortController;
const CACHE: Record<string, ResponseData<{ data: CityRaw[] }>> = {};

export const getCitiesByName = async (name: string): Promise<ResponseData<{ data: CityRaw[] }>> => {
  const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${name}&limit=10&offset=0&hateoasMode=false`;
  if (url in CACHE) {
    return CACHE[url];
  }

  if (signal) {
    controller.abort();
  }
  // Create a new controller to cancel future extra requests
  controller = new AbortController();
  signal = controller.signal;

  const response = await makeRequest(url, { signal });
  const data = await handleResponse<{ data: CityRaw[] }>(response);
  if (data.isSuccessful) {
    CACHE[url] = data;
  }

  return data;
};

export const parseCities = ({ data }: ResponseData<{ data: CityRaw[] }>): City[] => {
  if (data?.data) {
    return data.data.map(({ id, city, country }) => ({ id, city, country }));
  }

  return [];
};
