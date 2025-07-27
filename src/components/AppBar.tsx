import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/MainScreenStyles';

type Props = {
  onMenuPress: () => void;
  onHomePress: () =>void;
  onSearchPress: () =>void;
};

export default function AppBar({ onMenuPress,onHomePress,onSearchPress}: Props) {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu-outline" size={40} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onHomePress}>
        <Text style={styles.appTitle}>지금국회는</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSearchPress}>
        <Icon name="search-outline" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
