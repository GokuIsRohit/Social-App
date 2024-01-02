import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '../../Componets/MainContainer'
import FormView from './FormView'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme'
import DowmloadImage from './DowmloadImage'

const CheckForm = () => {

    const FormArry = [
        {
            type: "Name",
            limit: 20,
            keybordType: "",
            placeholder: "Enter Your Name",
            isValidate:"Yes"
        },
        {
            type: "Email",
            limit: 40,
            keybordType: "",
            placeholder: "Enter Your Email",
            isValidate:"Yes"
        },
        {
            type: "Mobile Number",
            limit: 10,
            keybordType: "numeric",
            placeholder: "Enter Your Mobile Number",
            isValidate:"Yes"
            // defaultValue:"2141412414"
        },
        {
            type: "Date of birth",
            keybordType:"date",
            placeholder: "Enter Your Date of birth",
            isValidate:"Yes"
            // defaultValue:"2141412414"
        },
        {
            type:"Address",
            keybordType:"",
            placeholder:"Enter Your Address",
            isValidate:"Yes"
        },
        // {
        //     type:"UPI ID",
        //     keybordType:"",
        //     placeholder:"Enter Your UPI_ID",
        //     isValidate:"Yes"
        // }
    ]

    const HandleApiResponse = async(data) => {
        try{
            console.log("res",data);
            if(data.produts !="" || data.produts != undefined){
                console.log(data.limit);
            }else{
                Alert.alert("","Something went wrong..!!")
            }
        }catch(error){
            console.log(error);
        }
      };

  return (
    <MainContainer>
        <View style={{marginTop:20,marginBottom:20}}>
                <Text style={{
                fontFamily: FONTS.SecondaryBold,
                fontSize: SIZES.font22,
                color: COLORS.Secondary,
                textAlign: 'center',
            }}>Sign in to your account</Text>
        </View>
      {/* <FormView
      FormType={"Auth"}
      FormData={FormArry}
      ApiURL={"https://dummyjson.com/products"}
      BtnLabel={"Submit"}
      onApiResponse={HandleApiResponse}
      /> */}
      <DowmloadImage/>
    </MainContainer>
  )
}

export default CheckForm

const styles = StyleSheet.create({})