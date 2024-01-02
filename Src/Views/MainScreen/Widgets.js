import { NativeModules, StyleSheet, Text, View,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import AsyncStorage from '@react-native-async-storage/async-storage'

import MainContainer from '../../Componets/MainContainer'
import CustomeInpusts from '../../Componets/CustomeInpusts'

const group = 'group.asap';
const SharedStorage = NativeModules.SharedStorage;
const Widgets = () => {

    // State
    const [text, setText] = useState(''); 

    const handleSubmit = async () => {
      try {
        // iOS
        await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
      } catch (error) {
        console.log({error});
      }
      // Android
      SharedStorage.set(JSON.stringify({text}));
      ToastAndroid.show('Change value successfully!', ToastAndroid.SHORT);
    };

  return (
    <MainContainer>
        <View style={{padding:10}}>
        <CustomeInpusts
        Label={"Note>>"}
        IsFocus={true}
        value={text}
        placeholder="Enter the text to display..."
        onChangeText={(text)=>setText(text)}
        onEndEditing={handleSubmit}
        />
        </View>
    </MainContainer>
  )
}

export default Widgets

const styles = StyleSheet.create({})