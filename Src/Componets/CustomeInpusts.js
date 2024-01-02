import { StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../Constants/Theme'

const CustomeInpusts = ({
    Label,
    placeholder,
    onChangeText,
    onFocus,
    IsFocus,
    keyboardType,
    value,
    defaultValue,
    maxLength,
    editable,
    onEndEditing,
    props
}) => {
  return (
    <View style={{marginHorizontal:10,borderWidth:IsFocus==true?1:0.4,borderColor:COLORS.Inactive,borderRadius:10,padding:5}}>
        <Text style={{
               fontFamily: FONTS.Primary,
               fontSize: SIZES.font16,
               color: COLORS.blackOg,
               fontWeight:'500',
               marginLeft:5
        }}>{IsFocus ==true?Label:""}</Text>
      <TextInput
      defaultValue={defaultValue}
      value={value}
      style={{width:"100%"}}
      placeholder={IsFocus ==true?"":placeholder}
      onChangeText={onChangeText}
      onFocus={onFocus}
      keyboardType={keyboardType}
      editable={editable}
      maxLength={maxLength}
      onEndEditing={onEndEditing}
      />
    </View>
  )
}

export default CustomeInpusts

const styles = StyleSheet.create({})