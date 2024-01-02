import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MainContainer from '../Componets/MainContainer'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HandelUserGoogleDetails } from '../Redux/Action/UserAction'

const SplaschScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            GetData();
        },700)
    },[])

    const dispatch = useDispatch();

    const GetData=async()=>{
        try{
            const Login= await AsyncStorage.getItem("IsLogin");
            if(Login=="Yes"){
                var data=[{
                    email: await AsyncStorage.getItem("email"),
                    familyName:await AsyncStorage.getItem("familyName"),
                    givenName:await  AsyncStorage.getItem("givenName"),
                    G_Emailid: await AsyncStorage.getItem("G_Emailid"),
                    name:await AsyncStorage.getItem("name"),
                    photo:await AsyncStorage.getItem("photo"),
                }];
                console.log("data:-0",data[0]);
                dispatch(HandelUserGoogleDetails(data[0]))
                navigation.replace("AuthStack")
            }else{
                navigation.replace("MainStack")
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <MainContainer>
      <Text>SplaschScreen</Text>
    </MainContainer>
  )
}

export default SplaschScreen

const styles = StyleSheet.create({})