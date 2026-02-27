import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui';
import { globalTheme } from '../../../config/theme';
import { PokemonCard } from '../../components/pokemon';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { data: pokemons } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0, 20),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={sytles.imgPosition} />

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={<Text variant="displayMedium">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const sytles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
