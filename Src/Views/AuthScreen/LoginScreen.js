import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Components
import MainContainer from '../../Componets/MainContainer'


// Theme
import { Theme } from '../../Constants/Theme'
import CustomeInpusts from '../../Componets/CustomeInpusts'
import CustomeButton, { GoogleButton } from '../../Componets/CustomeButton'
import { ConfigureGoogleSign } from '../../Helpers/ConfigureGoogleSign';
import { HandelUserGoogleDetails } from '../../Redux/Action/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { COLORS, SIZES, FONTS } = Theme

const LoginScreen = ({navigation}) => {

  const{email}= useSelector(state=> state.UserReducer);

  useEffect(() => {
    ConfigureGoogleSign()
  }, [])

  // State
  const [Eamil, setEmail] = useState(email);
  const [Password, setPassword] = useState("")
  const [IsFocus, setIsFocus] = useState(false);

  // Errors
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

  const dispatch= useDispatch();

  const HandleSubmit = () => {
    Alert.alert("", "Please alert")
  }

  const HandleGoogleLogin = async () => {
    ConfigureGoogleSign()
    try {
      await GoogleSignin.hasPlayServices();
      console.log("reached google sign in");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
      if(userInfo.user !==null || userInfo.user !==undefined){
        await AsyncStorage.setItem("email",userInfo.user.email)
        await AsyncStorage.setItem("familyName",userInfo.user.familyName)
        await AsyncStorage.setItem("givenName",userInfo.user.givenName)
        await AsyncStorage.setItem("G_Emailid",userInfo.user.id)
        await AsyncStorage.setItem("name",userInfo.user.name)
        await AsyncStorage.setItem("photo",userInfo.user.photo)
        await AsyncStorage.setItem("IsLogin","Yes");
        var data = [{
          email: userInfo.user.email,
          familyName: userInfo.user.familyName,
          givenName: userInfo.user.givenName,
          G_Emailid: userInfo.user.id,
          name: userInfo.user.name,
          photo: userInfo.user.photo,
        }];
        console.log("Data:-", data[0]);
        dispatch(HandelUserGoogleDetails(data[0]));
        navigation.replace("MainStack")
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("userInfo:-", error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("userInfo:-", error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("userInfo:-", error)
        // play services not available or outdated
      } else {
        console.log("userInfo:-", error)
        // some other error happened
      }
    }
  }

  return (
    <MainContainer>
      <View style={styles.BackButtom}>
        <AntDesign name="arrowleft" color={COLORS.white} size={SIZES.font24} fontWeight='bold' />
      </View>
      <Text style={{
        fontFamily: FONTS.Primary,
        fontSize: SIZES.height / 20,
        color: COLORS.Inactive,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>Hello Again !</Text>
      <Text style={{
        fontFamily: FONTS.SecondaryBold,
        fontSize: SIZES.font16,
        color: COLORS.Inactive,
        textAlign: 'center',
      }}>Sign in to your account</Text>
      {/* Inputs */}
      <View style={{ marginVertical: SIZES.font12 }}>
        <CustomeInpusts
        defaultValue={Eamil}
          Label={"Eamil Address"}
          placeholder={"Eamil Address"}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setIsFocus(!IsFocus)}
          IsFocus={IsFocus}
        />

      </View>
      {/* Inputs */}
      <View style={{ marginVertical: SIZES.font12 }}>
        <CustomeInpusts
          Label={"Enter Password"}
          placeholder={"Enter Password"}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setIsFocus(!IsFocus)}
          IsFocus={IsFocus}
        />
      </View>
      {/* forgot Password */}
      <View style={{ marginHorizontal: 15 }}>
        <TouchableOpacity>
          <Text style={{
            fontFamily: FONTS.SecondaryBold,
            fontSize: SIZES.font16,
            fontWeight: 'bold',
            color: COLORS.Inactive,
          }}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      {/* Submit Button */}
      <View
        style={{ marginVertical: SIZES.font20, flex: 1, marginHorizontal: SIZES.font24 }}
      >
        <CustomeButton
          Label="Submit"
          onPress={() => HandleSubmit()}
        />

        {/* Google Button */}
        <View style={{ marginVertical: SIZES.font20 }}>
          <GoogleButton
            onPress={() => HandleGoogleLogin()}
          />
        </View>
      </View>
    </MainContainer>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

  headerView: {
    flex: 1,
    marginVertical: SIZES.font9,
    paddingHorizontal: 10
  },
  BackButtom: { backgroundColor: COLORS.Inactive, width: SIZES.width / 8, padding: 10, margin: SIZES.font18, borderRadius: 10, alignItems: "center" }
})