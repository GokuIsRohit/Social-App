import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomeButton from '../../Componets/CustomeButton'
import MainContainer from '../../Componets/MainContainer'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme'
import CustomeInpusts from '../../Componets/CustomeInpusts'

const Test = () => {

    const [Value1,setValue1]= useState(0)
    const [Value2,setValue2]= useState(0)
    const [Value3,setValue3]= useState(500)
    const [TotalAmount,setTotalAmount]= useState(null)

    const HandleSubmit=async()=>{
        try{
           const Val1 =Value1 =="" ||Value1 == undefined?0 :parseInt(Value1)
           const Val2 =Value2 =="" ||Value2 == undefined?0 :parseInt(Value2) 
            const Val3=Value3 =="" ||Value3 == undefined?0 : parseInt(Value3)
            const TotalValue =Val1 + Val3
            if(TotalValue !=="" || TotalValue == undefined || TotalValue !== 0){
                if(Val2 == 0 || Val2 == undefined){
                    total=parseInt(TotalValue)
                    console.log(total)
                    setTotalAmount(total)
                    setValue1(0)
                    setValue2(0)
                    setValue3(500)
                }else{

                    total=Val2>TotalValue?parseInt(TotalValue): parseInt(TotalValue -Val2)
                    console.log(total)
                    setTotalAmount(total)
                    setValue1(0)
                    setValue2(0)
                    setValue3(500)
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    const HandleValue=(Value3)=>{
        const Val1 =Value1 =="" ||Value1 == undefined?0 :parseInt(Value1)
        const Val2 =Value2 =="" ||Value2 == undefined?0 :parseInt(Value2) 
         const Val3=Value3 =="" ||Value3 == undefined?0 : parseInt(Value3)
         const TotalValue =Val1 + Val3
         if(TotalValue !=="" || TotalValue == undefined || TotalValue !== 0){
             if(Val2 == 0 || Val2 == undefined){
                 total=parseInt(TotalValue)
              return total
       
             }else{
                if(Val2==TotalValue){
                    total=0
                    return total
                }else{
                    total=Val2>TotalValue?parseInt(TotalValue): parseInt(TotalValue -Val2)
                    return total
                }
           
             }
            }
    }

  return (
    <MainContainer>
            {/* Inputs */}
       <View style={{marginVertical:SIZES.font12}}>
    <CustomeInpusts
    value={Value1.toString()}
    Label={"Enter Value1"}
    placeholder={"Value1"}
    keyboardType="numeric"
    onChangeText={(text)=>{
        setValue1(text)
    }}
    />
    </View>
    <View style={{marginVertical:SIZES.font12}}>
    <CustomeInpusts
    value={Value2.toString()}
    Label={"Enter Value2"}
    placeholder={"Enter Value2"}
    keyboardType="numeric"
    onChangeText={(text)=>{
        if(Value2 >Value3){
            setValue2("")
        }else{
            setValue2(text)
        }
    } 
}
    />
    {
    Value2 >Value3?(

        <Text   style={{
                fontFamily: FONTS.SecondaryBold,
                fontSize: SIZES.font16,
                color: COLORS.Secondary,
                textAlign: 'center',
              }}>Value2 is greater than Value3</Text>
    ):null}
    </View>
    <Text   style={{
                fontFamily: FONTS.SecondaryBold,
                fontSize: SIZES.font16,
                color: COLORS.Secondary,
                textAlign: 'center',
              }}>{HandleValue(Value3)}</Text>
                {/* <Text   style={{
                fontFamily: FONTS.SecondaryBold,
                fontSize: SIZES.font16,
                color: COLORS.Secondary,
                textAlign: 'center',
              }}>{TotalAmount}</Text> */}
      <View
      
    style={{marginVertical:SIZES.font20,flex:1,marginHorizontal:SIZES.font24}}
    >
    <CustomeButton
    Label="Submit"
    onPress={()=> HandleSubmit()}
    />
    </View>
    </MainContainer>
  )
}

export default Test

const styles = StyleSheet.create({})