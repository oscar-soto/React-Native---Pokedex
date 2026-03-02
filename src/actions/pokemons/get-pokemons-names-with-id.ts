import { pokeApi } from '../../config/api/pokeApi';
import { PokeAPIPaginatedResponse } from '../../infrastruture/interfaces/pokeApi';

export const getPokemonsNameWithId = async () => {
  const url = `/pokemon?limit=100000`;
  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

  return data.results.map(info => ({
    id: Number(info.url.split('/')[6]),
    name: info.name,
  }));
};
