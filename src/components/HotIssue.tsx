import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Platform,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {shadowStyle} from '../styles/library/shadow';

export default function HotIssue(){
    const [expanded, setExpanded] = useState(false);

    const keywords = [
      'React Native',
      'JavaScript',
      'Firebase',
      'Python',
      'TensorFlow',
      'Kotlin',
      'Flutter',
      'AI',
      'Node.js',
      'Django',
    ];

    return (
        <View style={styles.hotIssue}>
            <View style={styles.hotIssueColoredBox}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="trending-up" size={30} color="#FF2B00" />
                <Text style={styles.hotIssueFont}> 인기 검색어 </Text>
            </View>

            <View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setExpanded(prev => !prev)}
                >
                    <Text style={styles.hotIssueFont}>1. 안녕하세요</Text>
                    <Icon name={expanded ? 'caret-up' : 'caret-down'} size={18} color="#fff" style={{ marginLeft: 6 }} />
                </TouchableOpacity>

                {/* 펼쳐졌을 때만 나머지 2~10위 키워드 표시 */}
                {expanded && (
                <View style={{ marginTop: 8 }}>
                    {keywords.slice(1).map((word, index) => (
                    <Text key={index} style={styles.hotIssueFont}> {index +2}. {word}
                    </Text>
                    ))}
                </View>
                )}
            </View>
      </View>
    </View>
    );
}

const styles= StyleSheet.create({
    hotIssue: {
        padding: 20,
        backgroundColor :'#fff',
    },
    hotIssueColoredBox: {
        padding:3,
        backgroundColor: '#324A8A',
        borderRadius: 24,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        alignItems: 'center',
        flexDirection: 'row',
        ...shadowStyle,
    },

    hotIssueFont: {
        color: '#fff',
        fontSize: 16,
        padding: 3,
      },
    }
)