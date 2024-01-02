import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const MyContext = createContext();

const ContextDemo = ({childern}) => {

    const [Name,setName]= useState("");
    const [age,setage]= useState("");
    
    const UserDetails=()=>{
        setName("Goku");
        setage("25");
    }
    const contextValue = {
        Name,
        age,
        UserDetails,
      };

  return (
    <MyContext.Provider  value={contextValue}>
        <View style={{flex:1}}>
        {childern}
        </View>
    </MyContext.Provider>
  )
}

export default ContextDemo

const styles = StyleSheet.create({})