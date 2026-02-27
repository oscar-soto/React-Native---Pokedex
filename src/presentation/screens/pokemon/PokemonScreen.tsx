import { useContext } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';

import { FadeInImage, FullScreenLoader } from '../../components/ui';
import { Formatter } from '../../../config/helpers/formatter';
import { getPokemonsById } from '../../../actions/pokemons';
import { RootStackParams } from '../../navigator/StackNavigator';
import { ThemeContext } from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ route }: Props) => {
  const { pokemonId } = route.params;
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonsById(pokemonId),
    staleTime: 1000 * 60 * 60,
  });

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: pokemon.color }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Pokemon's name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}
        >
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={styles.typesContainer}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={styles.typeMargin}
          >
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={styles.spritContainer}
        renderItem={({ item }) => (
          <FadeInImage uri={item} style={styles.spritImage} />
        )}
      />

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>
      <FlatList
        data={pokemon.stats}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.name}
        centerContent
        renderItem={({ item }) => (
          <View style={styles.statsContainer}>
            <Text style={{ flex: 1, color: 'white' }}>
              {Formatter.capitalize(item.name)}
            </Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        horizontal
        centerContent
        renderItem={({ item }) => (
          <View style={styles.statsContainer}>
            <Text style={{ flex: 1, color: 'white' }}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{ color: 'white' }}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({ item }) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={styles.space} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typesContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
  },
  typeMargin: {
    marginLeft: 10,
  },
  spritContainer: {
    marginTop: 20,
    height: 100,
  },
  spritImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  space: {
    height: 100,
  },
});
