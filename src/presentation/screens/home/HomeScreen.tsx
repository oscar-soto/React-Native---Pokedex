import { View } from 'react-native';
import { Button } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View>
      <Button mode="contained" onPress={() => console.log('this is a test')}>
        Test
      </Button>
    </View>
  );
};
