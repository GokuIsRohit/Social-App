import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Theme
import { Theme } from '../Constants/Theme'

const{COLORS,SIZES,FONTS}=Theme

const MainContainer = ({
    Loading,
    children,
    ...props
}) => {
  return (
    <SafeAreaView pointerEvents={Loading ? 'none' : undefined} style={styles.container}>
        {
            Loading==true?(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator color={COLORS.Inactive} size={"large"}/>
            </View>
            ):(
       <View  style={{flex:1,}}>
    {children}
</View>
            )
        }
    
    </SafeAreaView>
  )
}

export default MainContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
         width: FONTS.width,
         height: FONTS.height,
    }
})