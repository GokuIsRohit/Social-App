import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import AuthStack from './AuthStack';
import { Store } from '../Redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainStack from './MainStack';
import SplaschScreen from '../Views/SplaschScreen';


const Stack= createStackNavigator()

const MainRoute=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='SplaschScreen'
      screenOptions={{
        headerShown:false
      }}
      >
        <Stack.Screen name='SplaschScreen' component={SplaschScreen}/>
        <Stack.Screen name='AuthStack' component={AuthStack}/>
        <Stack.Screen name='MainStack' component={MainStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const Route = () => {
  return (
    <Provider store={Store}>
      <GestureHandlerRootView style={{flex:1}}>
      <MainRoute/>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default Route

const styles = StyleSheet.create({})