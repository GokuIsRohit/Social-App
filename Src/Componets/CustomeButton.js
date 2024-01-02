import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS, SIZES } from '../Constants/Theme'

const CustomeButton = ({
    onPress,
    Label,
    props,
}) => {
  return (
    <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={onPress} style={{backgroundColor:COLORS.Inactive,alignItems:"center",padding:SIZES.font18,width:"100%",borderRadius:10}}>
            <Text style={{
                fontFamily: FONTS.Primary,
                fontSize: SIZES.font18,
                color: COLORS.white,
                textAlign: 'center',
                fontWeight:'bold'
              }}>{Label}</Text>
        </TouchableOpacity>
    </View>
  )
}

export const GoogleButton=({
  onPress,
  props
})=>{
  return(
    <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={onPress} style={{backgroundColor:COLORS.white,alignItems:"center",padding:SIZES.font18,width:"100%",borderRadius:10,elevation:5}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <FontAwesome name="google-plus" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
        <Text style={{color:COLORS.blackOg,fontSize:SIZES.font18,fontWeight:"700",marginLeft:10}}>Sign In with Google</Text>
        </View>
        </TouchableOpacity>
    </View>
  )
}

export default CustomeButton

const styles = StyleSheet.create({
    ButtonContainer:{
        alignItems:"center",
    }
})