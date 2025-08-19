import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
    return (
        <View style ={styles.container}>
            <View style={styles.separator} />

            <TouchableOpacity >
                <Text style={styles.font}>알림 설정</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity >
                <Text style={styles.font}>이용약관/개인정보처리방침</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <Text style={styles.font}>앱 버전 확인</Text>
            <View style={styles.separator} />

        </View>
        );
    }

const styles = StyleSheet.create({
    container:{
        paddingTop:70,
        background:'#fff'
        },
    font:{
        padding:10,
        paddingLeft:30,
        fontSize: 18,
        fontWeight:'500',
        },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
      },
    })