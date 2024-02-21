import {useCallback, useEffect} from 'react';
import {Image, View} from 'react-native';
import tw from 'twrnc';
import {color} from '..';

export const FlashScreen = ({navigation}: any) => {
  const handleNavigation = useCallback(() => {
    navigation.navigate('/auth');
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => handleNavigation(), 5000);
  }, [handleNavigation]);

  return (
    <View
      style={[
        tw`w-full h-full flex flex-1 flex-row justify-center items-center `,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <Image source={require('../assets/logo.png')} />
    </View>
  );
};
