import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => console.log('this is a test')}>
        Test
      </Button>
    </View>
  );
};
