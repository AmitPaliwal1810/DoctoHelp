import {View, Text, FlatList, Image, Pressable} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyDoctorList = [
  {
    id: '1',
    name: 'Doctor_1',
    speciality: 'speciality_121',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '2',
    name: 'Doctor_2',
    speciality: 'speciality_125',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '3',
    name: 'Doctor_3',
    speciality: 'speciality_122',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '4',
    name: 'Doctor_4',
    speciality: 'speciality_1263',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '5',
    name: 'Doctor_5',
    speciality: 'speciality_1245',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '6',
    name: 'Doctor_6',
    speciality: 'speciality_1220',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '7',
    name: 'Doctor_7',
    speciality: 'speciality_120',
    image: require('../assets/doctor.jpg'),
  },
  {
    id: '8',
    name: 'Doctor_8',
    speciality: 'speciality_127',
    image: require('../assets/doctor.jpg'),
  },
];

export const DoctorList = ({route, navigation}: any) => {
  const {id, name} = route.params;
  console.log(id);

  const [, setUserData] = useState(); // need to add state and set data

  const getDoctorList = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const {response}: any = await fetch('http://localhost:8080/doctor/id', {
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
    getDoctorList();
  }, [getDoctorList]);

  return (
    <View
      style={[
        tw`flex-1 p-4 gap-6`,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <Text style={tw`text-white text-3xl`}>{name}</Text>
      <FlatList
        data={dummyDoctorList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DoctorCard navigation={navigation} data={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const DoctorCard = ({navigation, data}: any) => {
  const handleClick = useCallback(() => {
    navigation.navigate('/bookAppoinment', {
      ...data,
    });
  }, [data, navigation]);
  return (
    <Pressable onPress={handleClick}>
      <View
        style={[
          tw`w-full h-30 flex-row rounded-2 items-center gap-4 mb-4 px-4 `,
          {
            backgroundColor: '#CECED8',
          },
        ]}>
        <Image source={data.image} style={tw`h-20 w-20 rounded-full`} />
        <View style={[tw`justify-center `]}>
          <Text style={tw`text-white text-xl`}>Name: {data.name}</Text>
          <Text style={tw`text-white text-xl`}>
            speciality: {data.speciality}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
