import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/globalStyles';

export default function AcceptedScreen() {
  return (
    <View style={styles.accepted}>
      <Text style={styles.detailTitleFont}>접수되었습니다</Text>
    </View>
  );
}
