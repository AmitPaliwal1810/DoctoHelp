import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AuthScreen,
  BookAppointmentScreen,
  DoctorList,
  FlashScreen,
  HomeScreen,
} from './scr';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
        <Stack.Screen
          name="/"
          component={FlashScreen}
          options={{
            title: 'Flash Screen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="/auth"
          component={AuthScreen}
          options={{
            title: 'Auth Screen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="/Home"
          component={HomeScreen}
          options={{
            title: 'Home Screen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="/doctorList"
          component={DoctorList}
          options={{
            title: 'Doctor List',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="/bookAppoinment"
          component={BookAppointmentScreen}
          options={{
            title: 'Book Appointment',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
