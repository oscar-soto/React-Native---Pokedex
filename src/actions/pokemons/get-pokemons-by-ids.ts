import { Pokemon } from '../../domain/entities/pokemon';
import { getPokemonsById } from './get-pokemon-by';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonsPromises: Promise<Pokemon>[] = ids.map(id => {
      return getPokemonsById(id);
    });

    return Promise.all(pokemonsPromises);
  } catch {
    throw new Error(`Error gettin pokemons by ids: ${ids}`);
  }
};
