import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/globalStyles';

type Props = {
  onMenuPress: () => void;
};

export default function AppBar({ onMenuPress }: Props) {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu-outline" size={40} color="#000" />
      </TouchableOpacity>

      <Text style={styles.appTitle}>지금국회는</Text>

      <TouchableOpacity>
        <Icon name="search-outline" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
