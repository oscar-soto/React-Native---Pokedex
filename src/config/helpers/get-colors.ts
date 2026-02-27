import ImageColors from 'react-native-image-colors';

const fallbackColor = 'grey';

export const getColorFromImage = async (img: string) => {
  const colors = await ImageColors.getColors(img, {
    fallback: fallbackColor,
  });

  switch (colors.platform) {
    case 'android':
      return colors.dominant ?? fallbackColor;
    case 'ios':
      return colors.background ?? fallbackColor;
    default:
      return fallbackColor;
  }
};
