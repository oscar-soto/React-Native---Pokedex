import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastruture/interfaces/pokeApi/';
import { PokemonMapper } from '../../infrastruture/mappers/pokemonMapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(infoPokemon => {
      return pokeApi.get<PokeAPIPokemon>(infoPokemon.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    const pokemons = await Promise.all(pokemonsPromises);

    return pokemons;
  } catch (error) {
    throw new Error(`Error getting pokemons: ${error}`);
  }
};
