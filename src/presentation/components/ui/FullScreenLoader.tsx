import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export const FullScreenLoader = () => {
  const { colors } = useTheme();

  return (
    <View style={[sytles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size={50} />
    </View>
  );
};

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
