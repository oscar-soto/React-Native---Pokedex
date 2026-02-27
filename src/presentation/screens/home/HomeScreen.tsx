import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui';
import { globalTheme } from '../../../config/theme';
import { PokemonCard } from '../../components/pokemon';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  // Traditional form to make a htpp request
  // const { data: pokemons } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0, 20),
  //   staleTime: 1000 * 60 * 60,
  // });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: params => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={sytles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={<Text variant="displayMedium">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
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
