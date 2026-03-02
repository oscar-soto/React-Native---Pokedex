import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { globalTheme } from '../../../config/theme';
import { PokemonCard } from '../../components/pokemon';
import {
  getPokemonsByIds,
  getPokemonsNameWithId,
} from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonsNameWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    // Is a number
    if (!isNaN(Number(term))) {
      const pokemonName = pokemonNameList.find(
        pokemon => pokemon.id === Number(term),
      );

      return pokemonName ? [pokemonName] : [];
    }

    if (term.length === 0) return [];
    if (term.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(term.toLocaleLowerCase()),
    );
  }, [term, pokemonNameList]);

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top + 5 }]}>
      <TextInput
        placeholder="Search pokemons"
        mode="flat"
        autoCorrect={false}
        autoFocus
        onChangeText={setTerm}
        value={term}
      />

      {isLoadingPokemons && <ActivityIndicator style={{ padding: 20 }} />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};
