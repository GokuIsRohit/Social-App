import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import MainContainer from '../../Componets/MainContainer'
import { COLORS } from '../../Constants/Theme';
import CustomeButton from '../../Componets/CustomeButton';

const MultiSelectCalender = () => {

    const [markedDates, setmarkedDates] = useState([]);
    const [selectedDate,setselectdeDate]=useState([]);
    const[isSelectDay,setisSelectDay]=useState([])

    const onDayPress = (day) => {
        let temp = [...selectedDate]
         const selectedDay = moment(day.dateString).format('YYYY-MM-DD');
         
         let selected = true;
         if (markedDates[selectedDay]) {
            temp[selectedDay]
           selected = !markedDates[selectedDay].selected;
         }else{
           temp.push(selectedDay)
           setselectdeDate(temp)
         }
         const updatedMarkedDates = {...markedDates, ...{ [selectedDay]: { selected} } }

         var data=[]
         data.push(updatedMarkedDates)
         const selectedDate=[]
         data.forEach(dateobj => {
            for(let date  in dateobj){
                if(dateobj[date].selected == true){
                    selectedDate.push(date);
                }
            }
         });
         console.log("seletcted Dates:-",selectedDate)
         setisSelectDay(selectedDate)
         setmarkedDates(updatedMarkedDates);
     }

  return (
    <MainContainer>
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
                            markingType:"period" 
                        }}
                        
                        minDate={Date()}
                        monthFormat={"MMMM yyyy"}
                        markedDates={markedDates}
                        onDayPress={onDayPress}
                    />
                    {/* <View style={{padding:10,flex:1}}>
                    <CustomeButton
                    Label={"Submit"}
                    onPress={()=> console.log("Submit Date:-",isSelectDay)}
                    />
                    </View> */}
    </MainContainer>
  )
}

export default MultiSelectCalender

const styles = StyleSheet.create({
    Calendarstyle: {
        borderRadius: 10,
        elevation: 4,
        margin: 10,
        padding: 10
    }
})