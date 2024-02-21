import {View, Image, Pressable, Text} from 'react-native';
import tw from 'twrnc';
import {color} from '..';

export const TopNavigation = () => {
  return (
    <View
      style={[
        tw`w-full h-36 flex-row py-2 px-4 rounded-4 justify-between items-center relative`,
        {
          backgroundColor: color.primary_1,
        },
      ]}>
      <View style={[tw`w-68 h-24 flex-row items-center justify-evenly gap-2 `]}>
        <Image source={require('../assets/person.png')} />
        <View>
          <Text style={tw`text-white text-xl`}>Name: Amit Paliwal</Text>
          <Text style={[tw`text-white text-xl`]}>Address: Prabhat Colony</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          console.log('hello');
        }}
        style={({pressed}) => [
          tw`p-2 rounded-full absolute right-2 top-4`,
          {
            backgroundColor: pressed ? color.primary_1 : color.primary,
          },
        ]}>
        <Image source={require('../assets/Settings.png')} />
      </Pressable>
    </View>
  );
};
