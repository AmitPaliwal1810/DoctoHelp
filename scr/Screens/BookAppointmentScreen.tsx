import {View, Image, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {useState} from 'react';

const availableTiming = [
  {
    label: '1 PM - 2 PM',
    value: '1-2',
  },
  {
    label: '3 PM - 4 PM',
    value: '3-4',
  },
  {
    label: '5 PM - 6 PM',
    value: '5-6',
  },
  {
    label: '8 PM - 9 PM',
    value: '8-9',
  },
];

export const BookAppointmentScreen = ({route}: any) => {
  const {name, image, id, speciality} = route.params;
  console.log(id);
  const [TodayBooking, setTodayBooking] = useState<string>('');
  const [TomorrowBooking, setTomorrowBooking] = useState<string>('');

  const handleTodayBooking = (tab: string) => {
    setTodayBooking(tab);
  };
  const handleTomorrowBooking = (tab: string) => {
    setTomorrowBooking(tab);
  };
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
      <TouchableOpacity onPress={() => {}} style={tw`items-center`}>
        <View
          style={[
            tw`w-40 items-center p-4 rounded-2`,
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
        {
          backgroundColor: isSelected ? '#9CA3B0' : '#DFDFDF',
        },
      ]}
      onPress={onPress}>
      <Text style={tw`text-black`}>{label}</Text>
    </TouchableOpacity>
  );
};
