import {FlatList, Text, View, Image, ScrollView, Pressable} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {TopNavigation} from '../Components';
import {FC, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemProps = {title: string; imageSrc: any};

const DATA = [
  {
    id: '1',
    title: 'We care for you — inside and out!',
    image: require('../assets/1.png'),
  },
  {
    id: '2',
    title: 'Better Medicine Makes a Better World!',
    image: require('../assets/2.png'),
  },
  {
    id: '3',
    title: 'Good Health — More Important Than Money!',
    image: require('../assets/3.png'),
  },
  {
    id: '4',
    title: 'Good Health — It’s a Matter of Life & Death!',
    image: require('../assets/4.png'),
  },
];

const disease = [
  {
    id: '1',
    title: 'Infectious diseases',
  },
  {
    id: '2',
    title: 'Cervical cancer',
  },
  {
    id: '3',
    title: 'Leptospirosis',
  },
  {
    id: '4',
    title: 'Congenital disorders',
  },
  {
    id: '5',
    title: 'Depression',
  },
];

export const HomeScreen: FC<any> = ({navigation}) => {
  const [, setUserData] = useState(); // need to add state and set data

  const getDiseaseList = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const {response}: any = await fetch('http://localhost:8080/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Need to add token
      const data = await response.json();
      setUserData(data);
      console.log({data});
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDiseaseList();
  }, [getDiseaseList]);

  return (
    <View
      style={[
        tw`w-full h-full pt-8 px-4 justify-between items-center gap-4`,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <TopNavigation />
      <ScrollView>
        <View style={[tw`w-full h-full flex flex-1 justify-center  `]}>
          <FlatList
            data={DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Item title={item.title} imageSrc={item.image} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          style={[
            tw`w-full h-100 rounded-2 flex flex-1 justify-center mt-4 p-4 gap-4  `,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: '#D9D9D9',
            },
          ]}>
          <Text style={tw`text-black text-3xl`}>Disease Category</Text>
          <FlatList
            data={disease}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <DiseaseCategory navigation={navigation} data={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Item = ({title, imageSrc}: ItemProps) => {
  return (
    <View
      style={[
        tw`h-40 w-88 flex-1 flex-row bg-white px-2 mr-4 items-center rounded-md `,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: '#CECED8',
        },
      ]}>
      <Text style={tw`w-52 text-black text-center text-2xl font-bold`}>
        {title}
      </Text>
      <Image
        source={imageSrc}
        alt="image"
        style={[
          tw`h-40 w-40`,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            resizeMode: 'contain',
          },
        ]}
      />
    </View>
  );
};

const DiseaseCategory = ({data, navigation}: any) => {
  const handleClick = useCallback(() => {
    navigation.navigate('/doctorList', {
      id: data.id,
      name: data.title,
    });
  }, [data.id, data.title, navigation]);

  return (
    <Pressable onPress={handleClick}>
      <View
        style={[
          tw`w-full h-14 justify-center rounded-2 p-4 mb-4`,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: '#9ba3ae',
          },
        ]}>
        <Text style={tw`text-white text-lg`}>{data.title}</Text>
      </View>
    </Pressable>
  );
};
