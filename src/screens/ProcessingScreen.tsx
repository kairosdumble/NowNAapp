import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/globalStyles';

export default function ProcessingScreen() {
  return (
    <View style={styles.basicBlock}>
      <Text style={styles.detailTitleFont}>처리중입니다</Text>
    </View>
  );
}
