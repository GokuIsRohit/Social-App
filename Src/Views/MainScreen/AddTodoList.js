import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BottomSheet, {
    BottomSheetScrollView,
  } from '@gorhom/bottom-sheet';
  import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

import MainContainer from '../../Componets/MainContainer'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import CustomeInpusts from '../../Componets/CustomeInpusts';
import CustomeButton from '../../Componets/CustomeButton';

const AddTodoList = ({ navigation,route }) => {

    const today= moment().format('YYYY-MM-DD');
    const bottomSheetRef = useRef();
    const [marketDates,setmarketDates]= useState({})
    const [selectedDate,setselectdeDate]=useState([]);
    const [isShowSheet,setisShowSheet]= useState(false);
    const [isSelectedDate,setisSelectedDate]= useState("");

    const[Task,setTask]= useState("");
    const[NoHours,setNoHours]= useState(0);
    const{Data}=route.params;


    // Date Press Event
    const onDayPress=async(day)=>{
        setisShowSheet(true)
        let temp=[...selectedDate]
        const selectedDay = moment(day.dateString).format('YYYY-MM-DD');
        setisSelectedDate(selectedDay);
        const isDaySelected= temp.includes(selectedDay);
        let markedDates = {};
        markedDates[selectedDay] = { selected: true, selectedColor: COLORS.Inactive, selectedTextColor: COLORS.white }
        setmarketDates(markedDates)
        }

    // On Submit
    const HandleSubmitTask=async()=>{
        try{
            if(NoHours=="" || NoHours== undefined){
                Alert.alert("","Please select hours for a task")
            }else if(NoHours>24){
                Alert.alert("","Please select no of hours between 1 to 24");
            }else if(Task =="" || Task == undefined){
                Alert.alert("","Please enter task name...!!")
            }else{
                setisShowSheet(false)
                console.log(NoHours,isSelectedDate)
                HandleSubmit()
            }
        }catch(error){
           
            console.log(error);
        }
    } 

    const HandleSubmit=async()=>{
        let currentIndex=Data
        const indexVal=currentIndex==0?0: currentIndex.length;
        try{  
            const response= await database().ref(`/todoList/${indexVal}`)
            .set({
                    code:indexVal,
                    Task:Task,
                    NoHours:NoHours,
                    Date:isSelectedDate
                }
            )
            // console.log("response",response)
            navigation.goBack();
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        GetDataFormDatabse();
       },[])
      
     
  const GetDataFormDatabse=async()=>{
    try{
      const data= await database().ref("todoList").on("value",tempData=>{
      console.log("Temp:-",tempData.val())
      });
    }catch(error){
      console.log(error)
    }
  }
    return (
        <MainContainer>
            {/* Back Button */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <TouchableOpacity style={styles.AddICon}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back-ios-new" color={COLORS.white} size={SIZES.font24} fontWeight='bold' />
                </TouchableOpacity>
            </View>
            {/* Calendars */}
            <View style={styles.CalendarContainer}>
                <Calendar
                    style={styles.Calendarstyle}
                    theme={{
                        'stylesheet.calendar.header': {
                            
                            dayTextAtIndex0: {
                                color: 'red'
                            },
                            dayTextAtIndex1: {
                                color: COLORS.blackOg
                            },
                            dayTextAtIndex2: {
                                color: COLORS.blackOg
                            },
                            dayTextAtIndex3: {
                                color: COLORS.blackOg
                            },
                            dayTextAtIndex4: {
                                color: COLORS.blackOg
                            },
                            dayTextAtIndex5: {
                                color: COLORS.blackOg
                            },
                            dayTextAtIndex6: {
                                color: COLORS.blackOg
                            },
                        },
                        backgroundColor: COLORS.white,
                        calendarBackground: COLORS.white,
                        todayTextColor: COLORS.white,
                        todayBackgroundColor: COLORS.Inactive,
                        dayTextColor: "#222222",
                        monthTextColor: COLORS.blackOg,
                        arrowColor: COLORS.blackOg,
                        textDayFontWeight: "300",
                        textMonthFontWeight: "bold",
                        textDayHeaderFontWeight: "500",
                        textDayFontSize: 14,
                        textMonthFontSize: 18,
                        selectedDayBackgroundColor: COLORS.Inactive,
                        selectedDayTextColor: COLORS.white,
                        textDayHeaderFontSize: 12,
                        // markingType:"period" 
                    }}
                    minDate={Date()}
                    monthFormat={"MMMM yyyy"}
                    onDayPress={onDayPress}
                    markedDates={marketDates}
                />
                {
                    isShowSheet==true?(

                     <BottomSheet
        //   enablePanDownToClose={true}
          keyboardShouldPersistTaps="handled"
          backgroundStyle={{backgroundColor: COLORS.white, borderRadius: 25,
            elevation: 20,
            padding: 10}}
          handleIndicatorStyle={{backgroundColor: COLORS.blackOg}}
          animateOnMount={false}
          index={1}
          backDropColor="red"
          style={{flex: 1, backgroundColor: 'transparent'}}
          ref={bottomSheetRef}
          snapPoints={['40%','65%']}
          enableContentPanningGesture={false}>
            <View style={{padding:10,flexDirection:"row",alignItems:"center",}}>
            <MaterialIcons name="add-task" color={COLORS.Inactive} size={SIZES.font20} fontWeight='bold'/>
                <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"bold",fontSize:SIZES.font22,color:COLORS.blackT,marginHorizontal:10}}>Add a task</Text>
            </View>
                <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:10,marginTop:10}}>
                <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"700",fontSize:SIZES.font18,color:COLORS.blackT,marginHorizontal:10}}>Task Name</Text>
                <View style={{marginLeft:5,width:"90%"}}>
                  <TextInput
                  placeholder='Enter Name'
                  style={{borderBottomWidth:0.5,width:"70%",fontFamily:FONTS.Secondary,fontSize:SIZES.font16,fontWeight:"500"}}
                  onChangeText={(text)=>setTask(text)}
                  />
                </View>
                </View>
                {/* Hours */}
                <View style={{justifyContent:"flex-start",marginTop:10}}>
                <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:10,justifyContent:"space-between"}}>
                <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"700",fontSize:SIZES.font18,color:COLORS.blackT,marginHorizontal:10}}>Hours</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>

                <TextInput
                  placeholder='00'
                  keyboardType='numeric'
                  maxLength={2}
                  style={{width:"50%",fontFamily:FONTS.Secondary,fontSize:SIZES.font16,fontWeight:"500",borderBottomWidth:0.5}}
                  onChangeText={(text)=>setNoHours(text)}
                  />
                    <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"700",fontSize:SIZES.font18,color:COLORS.white,marginHorizontal:10}}>Hours</Text>
                </View>
                </View>
                </View>
                {/* Date */}
                <View style={{marginHorizontal:10,marginTop:20}}>
                <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"700",fontSize:SIZES.font14,color:COLORS.blackT,marginHorizontal:10}}>Selected Day is {isSelectedDate}</Text>
                </View>
                {/* Submit Button */}
                <View style={{flex:1,alignItems:"center",marginVertical:20}}>
                <TouchableOpacity style={styles.DonBtn}
                    onPress={() => HandleSubmitTask()}
                >
                 <Text style={{fontFamily:FONTS.PrimaryBold,fontWeight:"700",fontSize:SIZES.font18,color:COLORS.white,marginHorizontal:10}}>Done</Text>
                </TouchableOpacity>
                </View>
          </BottomSheet>
                    ):(
                        <></>
                    )
                }
            </View>
        </MainContainer>
    )
}

export default AddTodoList

const styles = StyleSheet.create({
    AddICon: {
        backgroundColor: COLORS.Inactive,
        width: 50,
        height: 50,
        alignItems: "center",
        borderRadius: 60,
        justifyContent: "center"
    },
    DonBtn:{
        backgroundColor: COLORS.Inactive,
        width: "90%",
        height: 50,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center"
    },
    CalendarContainer: {
        flex:1
    },
    Calendarstyle: {
        borderRadius: 10,
        elevation: 4,
        margin: 10,
        padding: 10
    }
})