import {View, Image, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const availableTiming = [
  {
    label: '1 PM - 2 PM',
    value: '1pm-2pm',
  },
  {
    label: '3 PM - 4 PM',
    value: '3pm-4pm',
  },
  {
    label: '5 PM - 6 PM',
    value: '5pm-6pm',
  },
  {
    label: '8 PM - 9 PM',
    value: '8pm-9pm',
  },
];

export const BookAppointmentScreen = ({route}: any) => {
  const {name, image, id, speciality} = route.params;
  console.log(id);
  const [TodayBooking, setTodayBooking] = useState<string>('');
  const [TomorrowBooking, setTomorrowBooking] = useState<string>('');

  const [, setUserData] = useState(); // need to add state and set data

  const handleSubmit = useCallback(async () => {
    try {
      const {response}: any = await fetch('http://localhost:8080/slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slot: TodayBooking ?? TomorrowBooking,
        }),
      });
      // Need to add token
      const data = await response.json();
      console.log({data});
    } catch (error) {
      console.log(error);
    }
  }, [TodayBooking, TomorrowBooking]);

  const getDoctorDetail = useCallback(async () => {
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
    getDoctorDetail();
  }, [getDoctorDetail]);

  const handleTodayBooking = useCallback(async (tab: string) => {
    setTodayBooking(tab);
  }, []);
  const handleTomorrowBooking = useCallback(async (tab: string) => {
    setTomorrowBooking(tab);
  }, []);
  return (
    <View
      style={[
        tw`flex-1 p-4 gap-8`,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <View
        style={[
          tw`h-78 w-full rounded-2 items-center justify-center gap-4`,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: '#ceced8',
          },
        ]}>
        <Image source={image} style={tw`h-40 w-40 rounded-full`} />
        <View style={[tw`justify-center items-center `]}>
          <Text style={tw`text-white text-xl`}>Name: {name}</Text>
          <Text style={tw`text-white text-xl`}>speciality: {speciality}</Text>
        </View>
      </View>
      <View style={tw`gap-4`}>
        <Text style={[tw`text-white text-xl`]}>Today's availability</Text>
        <View style={tw`flex-row items-center flex-wrap gap-4`}>
          {availableTiming.map(x => (
            <TabButton
              key={x.label}
              label={x.label}
              isSelected={TodayBooking === x.value}
              onPress={() => handleTodayBooking(x.value)}
            />
          ))}
        </View>
      </View>
      <View style={tw`gap-4`}>
        <Text style={[tw`text-white text-xl`]}>Tomorrow's availability</Text>
        <View style={tw`flex-row items-center flex-wrap gap-4`}>
          {availableTiming.map(x => (
            <TabButton
              key={x.label}
              label={x.label}
              isSelected={TomorrowBooking === x.value}
              onPress={() => handleTomorrowBooking(x.value)}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={tw`items-center`}>
        <View
          style={[
            tw`w-40 items-center p-4 rounded-2`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: '#9CA3B0',
            },
          ]}>
          <Text>Save your Appointment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TabButton = ({label, isSelected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={[
        tw`w-24 h-8 bg-white items-center justify-center rounded-4 `,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: isSelected ? '#9CA3B0' : '#DFDFDF',
        },
      ]}
      onPress={onPress}>
      <Text style={tw`text-black`}>{label}</Text>
    </TouchableOpacity>
  );
};
