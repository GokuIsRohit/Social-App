import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


// Auth Screen
import LoginScreen from '../Views/AuthScreen/LoginScreen';

const Auth= createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{
      headerShown:false
    }}>
        <Auth.Screen name='LoginScreen' component={LoginScreen}/>
    </Auth.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})