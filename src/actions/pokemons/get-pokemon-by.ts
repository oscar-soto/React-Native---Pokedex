import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import { PokeAPIPokemon } from '../../infrastruture/interfaces/pokeApi';
import { PokemonMapper } from '../../infrastruture/mappers/pokemonMapper';

export const getPokemonsById = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

    return pokemon;
  } catch {
    throw new Error(`Error getting pokemon by id: ${id}`);
  }
};
