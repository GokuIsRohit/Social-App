import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

// Component
import MainContainer from '../../Componets/MainContainer'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme'
import { getCurrentDate } from '../../Helpers/GetCurrenDate'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


const TodoList = ({navigation}) => {

    const isFocused= useIsFocused();


    useEffect(()=>{
        if(isFocused==true){
            GetDataFormDatabse();
        }
       },[isFocused])
      
     
  const GetDataFormDatabse=useCallback(async()=>{
    try{
        setLoading(true)
      const data= await database().ref("todoList").on("value",tempData=>{
      console.log("Temp:-",tempData.val())
     const temp=tempData.val();
     if(temp == null || temp == undefined){
         setList([])
         setLoading(false)
        }else{
            setLoading(false)
            const tempData=Object.values(temp).filter((item)=>item !==null && item !== undefined)
         setList(tempData);
     }
      });
    }catch(error){
        setLoading(false)
        setList([])
      console.log(error)
    }
  },[])

    // State
    const [Loading,setLoading]= useState(false);
    const [TodayDate,setTodayDate]= useState(getCurrentDate())
    const [List,setList]= useState([]);

    // Delete Item
// Delete Item
const HandleDelete = async (index,item) => {
    try {
      await database().ref(`todoList/${item.code}`).remove()
        .then(() => {
          console.log('Item deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainContainer Loading={Loading}>
        <View style={{height:"20%",backgroundColor:COLORS.Inactive}}>
            <View style={{margin:10,}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <FontAwesome name="list-alt" color={COLORS.white} size={SIZES.font24} fontWeight='bold'/>
                <Text style={{color:COLORS.white,fontSize:SIZES.font20,fontWeight:"700",marginLeft:5}}>Todo List</Text>
                </View>
            </View>
            <View style={{justifyContent:"space-between",
            flexDirection:"row",
            alignItems:"center",
            marginHorizontal:25,
            marginTop:SIZES.font20
             } }>
                <Text style={{fontFamily:FONTS.PrimaryBold,fontSize:SIZES.font20,color:COLORS.white,fontWeight:"700"}}>Today</Text>
                <Text style={{color:COLORS.white,fontSize:SIZES.font16,fontWeight:"700"}}>{TodayDate}</Text>
            </View>
            {/* Task Count */}
            <View style={{marginHorizontal:25,marginTop:SIZES.font10}}>
            <Text style={{color:COLORS.white,fontFamily:FONTS.PrimaryBold,fontWeight:"500",fontSize:SIZES.font14}}>{`${List.length==null?"0":List.length
            } Tasks| ${1} Events`}</Text>
            </View>
        </View>
        {/* Listing */}
    <>
    {
        List.length >0 || List !== undefined ?(

            <FlatList
            data={List}
            keyExtractor={item => item.Task}
            renderItem={({item,index})=>{
             return(
                 <View style={{flex:1,backgroundColor:COLORS.white,padding:10}}>
                 <View style={{marginTop:5, elevation: 5,backgroundColor:COLORS.whiteBG,padding:10,borderRadius:5}}>
                 {/* Date */}
             <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Fontisto name="date" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
                 <Text style={{marginLeft:10,fontFamily:FONTS.PrimaryBold,fontSize:SIZES.font16,color:COLORS.blackOg,fontWeight:"700"}}>{item.Date}</Text>
             </View>
             {/* Details */}
             <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                 <View style={{justifyContent:"flex-start",flexDirection:"row",alignItems:"center"}}>
             <MaterialIcons name="task" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
             <Text style={{marginLeft:5,mfontFamily:FONTS.PrimaryBold,fontSize:SIZES.font14,color:COLORS.blackOg,fontWeight:"500"}}>{item.Task}</Text>
                 </View>
                 <Text style={{marginLeft:5,mfontFamily:FONTS.PrimaryBold,fontSize:SIZES.font14,color:COLORS.blackOg,fontWeight:"500"}}>{item.NoHours} hours</Text>
             </View>
             {/* Option */}
        
             <View style={{flexDirection:"row",justifyContent:"flex-end",marginTop:10}}>
                 <TouchableOpacity style={styles.ListOption}>
                 <MaterialIcons name="edit-square" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
                 </TouchableOpacity >
                 <TouchableOpacity style={styles.ListOption}
                 onPress={()=> HandleDelete(index,item)}
                 >
                 <MaterialIcons name="delete" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.ListOption}
                  onPress={()=> HandleDelete(index,item)}
                 >
                 <Ionicons name="checkmark-done-circle-outline" color={COLORS.Inactive} size={SIZES.font24} fontWeight='bold'/>
                 </TouchableOpacity>
             </View>
    
             </View>
             </View>
             )
            }}
            />
        ):null
    }
    </>
       
        {/* Add Button */}
     <View style={{flex:1,}}>
        <TouchableOpacity style={styles.AddICon} 
        onPress={()=> navigation.navigate("AddTodoList",{Data:List})}
        >
     <Ionicons name="add-outline" color={COLORS.white} size={SIZES.font24} fontWeight='bold'/>
        </TouchableOpacity>
     </View>
    </MainContainer>
  )
}

export default TodoList

const styles = StyleSheet.create({
    AddICon:{
        position:"absolute",
        right:20,
        bottom:20,
        backgroundColor:COLORS.Inactive,
        width:60,
        height:60,
        alignItems:"center",
        borderRadius:60,
        justifyContent:"center"
    },
    ListOption:{
        marginHorizontal:5
    }
})