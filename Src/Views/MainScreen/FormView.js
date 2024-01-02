import { Alert, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// 
import MainContainer from '../../Componets/MainContainer'
import CustomeInpusts from '../../Componets/CustomeInpusts'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme'
import CustomeButton from '../../Componets/CustomeButton'
import Calender from '../../Componets/Calender'

export const nameRegex = /^[A-Za-z ]+$/;
export const mobilePattern = /^[6-9]\d{5}/;
export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const upiidcheck = /^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]$/;

 const FormView = ({
    FormData,
    ApiURL,
    BtnLabel,
    FormType,
    onApiResponse}) => {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [MobileNumber, setMobileNumber] = useState("");
    const [Date,setDate]= useState("");
    const [Address,setAddress]= useState("");
    const [UPI_ID,setUPI_ID]= useState("");
    const [Gender,setGender]= useState("");

    // For error
    const [errorMsg, seterrorMsg] = useState("");
    const [isErrorShow, setisErrorShow] = useState(!isErrorShow);
    const [isErrorType, setisErrorType] = useState("")

    const HandleButtonPress=async()=>{
        try{
            if(Name=="" || Name== undefined){
                Alert.alert("","Please fill your name...!!")
            }else if(Email =="" || Email == undefined){
                Alert.alert("","Please fill your email...!!")
            }else if(MobileNumber == "" || MobileNumber == undefined){
                Alert.alert("","Please fill your Mobile number...!!")
            }else if(Date=="" || Date == undefined){
                Alert.alert("","Please fill your Date of birth...!!")
            }else if(Address=="" || Address == undefined){
                Alert.alert("","Please fill your address...!!")
            }
            else{
                HandleApiURL();
            }
        }catch(error){
            console.log(error)
        }
    }

    const HandleApiURL=async()=>{
        try{
            fetch(ApiURL)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok');
              })
            .then((data) => {
                if(data != "" || data != undefined) {
                    onApiResponse(data);
                }else{
                    onApiResponse("")
                }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }catch(error){  
            console.log(error);
        }
    }

   

    const ValidationInput = (val, type) => {
        switch (type) {
            case "Name":
                if(!nameRegex.test(val)){
                    setisErrorShow(true);
                    setisErrorType(type)
                    seterrorMsg("Please enter valid Name")
                    break;
                }else{
                setisErrorShow(false);
                seterrorMsg("")
                setName(val)
                setisErrorType("")
                break;
                }
            case "Email":
                if (val.includes(" ") || val.includes(",") || !val.includes("@")) {
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("email Validation")
                    break;
                }else if( !emailPattern.test(val)) {
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("email Validation")
                    break;
                }
                else {
                    setisErrorShow(false)
                    setEmail(val)
                    setisErrorType("")
                    seterrorMsg("")
                    break;
                }
            case "Mobile Number":
                if (val.includes(" ") || val.includes(".") || val.includes(",")) {
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("mobile Validation")
                    break;
                }else if(!mobilePattern.test(val)){
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("mobile pattern not match Validation")
                }
                else if (val.length < 10) {
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("mobile limit Validation")
                    break;
                } else {
                    if (val.length == 10) {
                        setisErrorShow(false)
                        Keyboard.dismiss();
                        setMobileNumber(val)
                        setisErrorType("")
                        seterrorMsg("")
                        break;
                    }
                }
            case "UPI ID":
                if(!upiidcheck.test(val)){
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("UPI_ID pattern not match Validation")
                    break;
                }   else if (val.length < 30) {
                    setisErrorShow(true)
                    setisErrorType(type)
                    seterrorMsg("UPI_ID limit Validation")
                    break;
                }else{
                    setisErrorShow(false)
                    setUPI_ID(val)
                    setisErrorType("")
                    seterrorMsg("")
                    break;
                }
            case "Gender":
                setGender(val);
                break;
            default:
                break;
        }
    }

    const HandleValue = (type, text) => {
        switch (type) {
            case "Name":
                ValidationInput(text, "Name")
                break;
            case "Email":
                ValidationInput(text, "Email")
                break;
            case "Mobile Number":
                ValidationInput(text, "Mobile Number")
                break;
            case "Address":
                setAddress(text)
                break;
            case "UPI ID":
                ValidationInput(text,"UPI ID")
            case "Gender":
                ValidationInput(text,"Gender")
            default:
                break;
        }
    }

    return (
        <MainContainer>

        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

            {
                FormData.map((item, index) => (
                    <View style={{ padding: 10 }}>
                        {
                            item.keybordType=="date"?(

                                    <Calender
                                    location={Date}
                                    setLocation={setDate}
                                    />
                            ):(
                                <CustomeInpusts
                                placeholder={item.placeholder}
                                Label={item.type}
                                maxLength={item.limit}
                                keyboardType={item.keybordType}
                                onChangeText={(text) => HandleValue(item.type, text)}
                                defaultValue={FormType=="Auth"?"":item.defaultValue}
                            />
                            )
                        }
                        {
                            isErrorShow == true && isErrorType == item.type ? (

                                <Text style={{
                                    fontFamily: FONTS.SecondaryBold,
                                    fontSize: SIZES.font12,
                                    color: COLORS.Secondary,
                                    textAlign: 'center',
                                }}>{errorMsg}</Text>
                            ) : null
                        }
                    </View>
                ))
            }
            <View style={{ padding: 10, flex: 1 }}>
                <CustomeButton
                    Label={BtnLabel}
                    onPress={() => HandleButtonPress()}
                />
            </View>
        </ScrollView>
        </MainContainer>
    )
}

export default FormView

const styles = StyleSheet.create({})