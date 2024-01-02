import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screen
import TodoList from '../Views/MainScreen/TodoList';
import AddTodoList from '../Views/MainScreen/AddTodoList';
import TabNavigation from './TabNavigation';

const Main=createStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator
    screenOptions={{
        headerShown:false
    }}
    initialRouteName='TabNavigation'
    >
      <Main.Screen name='TabNavigation' component={TabNavigation}/>
        <Main.Screen name='TodoList' component={TodoList}/>
        <Main.Screen name='AddTodoList' component={AddTodoList}/>
    </Main.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})