import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ListScreenStyles';

export default function ListBlock(){
    return(
        <View style={styles.bodyBlock}>
            <Text style={styles.blockHeadingFont}>[의안번호]의안이름</Text>
            <Text style={styles.blockBodyFont}>의안내용입닏다아아아아</Text>
            <Text style={styles.blockBodyFont}>관련 문구1</Text>
        </View>
        );
    }