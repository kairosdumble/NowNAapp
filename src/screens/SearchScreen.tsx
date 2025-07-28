import React from 'react';
import { View, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


type Props = {
    onSortSearchPress: () => void;
}

export default function SearchScreen({onSortSearchPress} :Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="#333" />
      </TouchableOpacity>

      <TextInput
        placeholder="키워드를 입력해보세요"
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity onPress={onSortSearchPress}>
        <Icon name="search-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },
});
