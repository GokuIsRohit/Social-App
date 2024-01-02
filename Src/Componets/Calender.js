//import liraries
import React, { Component, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { COLORS, FONTS, SIZES } from '../Constants/Theme';
import CustomeButton from './CustomeButton';

// Theme


// create a component
const Calender = ({ location, setLocation }) => {

    // State
    const [showModal, setshowModal] = useState(false);
    const [selectedDate, setselectedDate] = useState("");
    const [markedDates, setmarkedDates] = useState({});

    // For selecting date 
    const onDayPress = (day) => {
        let markedDates = {};
        markedDates[day] = { selected: true, selectedColor: COLORS.Secondary, selectedTextColor: COLORS.white }
        let serviceDate = moment(day);
        serviceDate = serviceDate.format("DD/MM/YYYY");
        setselectedDate(serviceDate);
        setLocation(serviceDate);
        setmarkedDates(markedDates);
        setshowModal(false);
    }

    return (
        <View>
            <Pressable
                style={styles.btncontainer}
                onPress={() => setshowModal(true)}
            >
                <Text style={[styles.btntext,{color:selectedDate==""? COLORS.placeholder:COLORS.blackT,fontFamily: FONTS.Primary,
               fontSize: SIZES.font14,
               fontWeight:'200',}]}>{selectedDate == "" || location == "" ? "DD/MM/YYYY" : selectedDate}</Text>
            </Pressable>
            <Modal visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setshowModal(!showModal);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <View>
                      
                    <Calendar
                        style={styles.Calendarstyle}
                        theme={{
                            'stylesheet.calendar.header': {
                                dayTextAtIndex0: {
                                    color: 'red'
                                },
                                dayTextAtIndex1: {
                                    color: COLORS.Secondary
                                },
                                dayTextAtIndex2: {
                                    color: COLORS.Secondary
                                },
                                dayTextAtIndex3: {
                                    color: COLORS.Secondary
                                },
                                dayTextAtIndex4: {
                                    color: COLORS.Secondary
                                },
                                dayTextAtIndex5: {
                                    color: COLORS.Secondary
                                },
                                dayTextAtIndex6: {
                                    color: COLORS.Secondary
                                },
                            },
                            backgroundColor: COLORS.white,
                            calendarBackground: COLORS.white,
                            todayTextColor: COLORS.white,
                            todayBackgroundColor: COLORS.Secondary,
                            dayTextColor: "#222222",
                            monthTextColor: COLORS.Secondary,
                            arrowColor: COLORS.Secondary,
                            textDayFontWeight: "300",
                            textMonthFontWeight: "bold",
                            textDayHeaderFontWeight: "500",
                            textDayFontSize: 14,
                            textMonthFontSize: 18,
                            // selectedDayBackgroundColor: COLORS.Secondary,
                            // selectedDayTextColor: COLORS.white,
                            textDayHeaderFontSize: 12
                        }}
                        // minDate={Date()}
                        monthFormat={"MMMM yyyy"}
                        markedDates={markedDates}
                        onDayPress={day => {
                            onDayPress(day.dateString);
                        }}
                    />
                     <TouchableOpacity style={{position:"absolute",left:10,borderWidth:1,backgroundColor:COLORS.Secondary,padding:5,borderRadius:10}}
                     onPress={()=>setshowModal(false)}
                     >
                        <Text style={{color:COLORS.white}}>Close</Text>
                       </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    btncontainer:{
    marginHorizontal:10,borderWidth:0.4,borderRadius:10,padding:5,paddingVertical:30
    },
    btntext: {
        fontFamily: FONTS.SecondaryBold,
        fontSize: SIZES.font12,
        color: COLORS.placeholder,
    },
    Calendarstyle: {
        borderRadius: 10,
        elevation: 4,
        margin: 20,
        padding:10
    }
});

//make this component available to the app
export default Calender;
