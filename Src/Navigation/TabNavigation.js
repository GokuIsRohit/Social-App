import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// Tab Screen
import TodoList from '../Views/MainScreen/TodoList';
import { COLORS, FONTS, SIZES } from '../Constants/Theme';
import AddTodoList from '../Views/MainScreen/AddTodoList';
import SplaschScreen from '../Views/SplaschScreen';
import CheckForm from '../Views/MainScreen/CheckForm';

const Tab= createBottomTabNavigator();

const TabNavigation = () => {
  return (
        <Tab.Navigator
        initialRouteName='TodoList'
        screenOptions={{
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,
            // keyboardHidesTabBar: true,
            tabBarStyle: {
                display:'flex',
                height: 55,
                borderTopColor: "transparent",
                backgroundColor:COLORS.white
            },
            showLabel: true,
            headerShown: true,
            headerStyle: {
                height: 65,
                backgroundColor: COLORS.white,
                elevation: 0,
                shadowOpacity: 0,
            },
            header: () => (<></>),
        }}
        tabBarOptions={{
            keyboardHidesTabBar: true,
            //...customTabBarStyle, // Apply customTabBarStyle here
        }}
        >
            <Tab.Screen
         options={{
            tabBarLabel:  ({ focused, color, size }) => {
                return(
                    <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:focused?"bold":"500",fontSize:focused?SIZES.font16:SIZES.font12, color:focused?COLORS.Inactive:COLORS.blackOg,}}>Task</Text>
                )
               },
            tabBarIcon: ({ focused, color, size }) => {
            return(
                <FontAwesome name="list-alt" color={focused?COLORS.Inactive:COLORS.blackOg} size={focused?SIZES.font30:SIZES.font20} fontWeight='bold'/>
            )
           }
        }}
            name='TodoList' component={TodoList}/>
              <Tab.Screen
          options={{
            tabBarLabel:  ({ focused, color, size }) => {
                return(
                    <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:focused?"bold":"500",fontSize:focused?SIZES.font16:SIZES.font12, color:focused?COLORS.Inactive:COLORS.blackOg,}}>Image Reader</Text>
                )
               },
            tabBarIcon: ({ focused, color, size }) => {
            return(
                <MaterialIcons name="add-task" color={focused?COLORS.Inactive:COLORS.blackOg} size={focused?SIZES.font30:SIZES.font20} fontWeight='bold'/>
            )
           }
        }}
            name='CheckForm' component={CheckForm}/>
        </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})