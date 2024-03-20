import {FC, useState, useCallback} from 'react';
import {Image, ScrollView, TextInput, View} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {CustomeButton} from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthScreen: FC<any> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [isLogInScreen, setIsLogInScreen] = useState<boolean>(true);

  const handleLogIn = useCallback(async () => {
    try {
      const {response}: any = await fetch('http://localhost:8080/v1/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      // Need to add token
      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
      console.log({data});
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('/Home');
  }, [email, navigation, password]);

  const handleSignUp = useCallback(async () => {
    try {
      const {response}: any = await fetch('http://localhost:8080/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          age: age,
          address: address,
        }),
      });
      const data = await response.json();
      console.log({data});
    } catch (error) {
      console.log(error);
      setIsLogInScreen(true);
    }
  }, [address, age, email, name, password]);

  const handleLogInScreenToggler = useCallback(
    () => setIsLogInScreen(prev => !prev),
    [],
  );

  return (
    <View
      style={[
        tw`w-full h-full flex flex-1 justify-center`,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={tw`w-full h-50 flex-1 flex-row justify-center items-center mt-4`}>
          <Image source={require('../assets/logo.png')} />
        </View>
        <View style={tw`w-full flex-col flex-3 px-8 gap-y-5 `}>
          <TextInput
            style={tw`h-14 w-full border-2 bg-white rounded-lg text-black text-2xl px-4`}
            onChangeText={setEmail}
            value={email}
            placeholder="Email..."
            placeholderTextColor="black"
          />
          <TextInput
            style={tw`h-14 w-full border-2 bg-white rounded-lg text-black text-2xl px-4`}
            onChangeText={setPassword}
            value={password}
            placeholder="Password..."
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          {!isLogInScreen && (
            <>
              <TextInput
                style={tw`h-14 w-full border-2 bg-white rounded-lg text-black text-2xl px-4`}
                onChangeText={setName}
                value={name}
                placeholder="Name..."
                placeholderTextColor="black"
              />
              <TextInput
                style={tw`h-14 w-full border-2 bg-white rounded-lg text-black text-2xl px-4`}
                onChangeText={setAge}
                value={age}
                placeholder="Age..."
                placeholderTextColor="black"
                inputMode="numeric"
              />

              <TextInput
                style={tw`h-14 w-full border-2 bg-white rounded-lg text-black text-2xl px-4`}
                onChangeText={setAddress}
                value={address}
                placeholder="Address..."
                placeholderTextColor="black"
              />
            </>
          )}

          <CustomeButton
            text={isLogInScreen ? 'LogIn' : 'SignUp'}
            onClick={isLogInScreen ? handleLogIn : handleSignUp}
            style={[
              tw`h-12 w-full border-2 rounded-lg flex justify-center items-center`,
              {
                backgroundColor: color.primary_1,
              },
            ]}
            textStyle={tw`text-black text-3xl `}
          />
          <CustomeButton
            text={
              !isLogInScreen
                ? 'You have account, click to Login'
                : "Don't have account, click to SignUp"
            }
            onClick={handleLogInScreenToggler}
            style={[tw`w-full  rounded-lg flex justify-center items-end`]}
            textStyle={tw`text-white text-sm `}
          />
        </View>
      </ScrollView>
    </View>
  );
};
