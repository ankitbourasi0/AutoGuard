import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import useShiftStore from '../states/shiftStore'; // Adjust the import path as needed
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';

interface ShiftTime {
    startTime: string;
    endTime: string;
    status: 'not_started' | 'ongoing' | 'completed';
}

interface DayShift {
    date: string;
    location: string;
    shifts: ShiftTime[];
}

const ShiftList: React.FC = () => {
    const { getShiftsForCurrentWeek, getShiftStatus, startShift, completeShift, navigateToShiftScreen } = useShiftStore();

    const navigation = useNavigation<NavigationProps>()
    const renderShift = ({ item }: { item: DayShift }) => {
        return (

            <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#000' }}>
         <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>

             <View style={{
                backgroundColor: '#3E3E3E',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: "#fff", padding:8
                }}>{format(new Date(item.date), 'dd MMM')}</Text>
            </View>
            <View style={{ marginLeft: 30 }}>

            <Text style={{ fontWeight: "bold" }}>{item.location}</Text>
                {item.shifts.map((shift, index) => {
                    const status = getShiftStatus(shift, item.date);
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 ,width:"100%"}}>
                         
                         
                            <Text>{`${shift.startTime} - ${shift.endTime}`}</Text>
                         <View style={{ marginLeft: "auto", marginRight: "auto" }}>

                            {status === 'can_start' && (
                                <TouchableOpacity onPress={() => {
                                    startShift(item.date, shift.startTime);
                                    navigateToShiftScreen(shift, item.date);
                                }} style={{ backgroundColor: '#03FCBA', borderRadius: 5, padding: 8,width:90,alignItems:"center"}}>
                                    <Text style={{ color: 'white' }}>Start</Text>
                                </TouchableOpacity>
                            )}
                            {status === 'ongoing' && (
                                <TouchableOpacity onPress={() => navigation.navigate("ShiftStartScreen",{ date: item.date, shift:shift})} style={{ backgroundColor: 'orange', borderRadius: 5, padding: 8,width:90,alignItems:"center"}}>
                                    <Text style={{ color: 'white' }}>Ongoing</Text>
                                </TouchableOpacity>
                            )}
                            {status === 'completed' && (
                                <View style={{
                                    backgroundColor: 'black', borderRadius: 5, padding: 8,width:90,alignItems:"center"
                                }}>
                                    <Text style={{ color: 'white' }}>Completed</Text>
                                </View>
                            )}
                            {status === 'not_started' && (
                                <View style={{ backgroundColor: '#960200', borderRadius: 5, padding: 8,width:90,alignItems:"center"}}>
                                <Text style={{ color: 'white' }}>Not Started</Text>

                                    </View>
                            )}

                            </View>
                        </View>
                    );
                })}

                </View>
                </View>
            </View>
        );
    };


    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("ViewMenu")}>
                    <Icon name="arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Shifts</Text>
            </View>
            <FlatList<DayShift>
                data={getShiftsForCurrentWeek()}
                renderItem={renderShift}
                keyExtractor={(item) => item.date}
            />
        </ScreenWrapper>
    );
};

export default ShiftList;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
});