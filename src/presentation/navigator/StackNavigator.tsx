import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemonId: number };
  SearchScreen: undefined;
};

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};
