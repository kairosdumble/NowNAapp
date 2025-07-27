import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
};

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>

          <TouchableOpacity onPress={onClose} style={{ marginBottom: 20 }}>
              <Icon name="menu-outline" size={40} color="#fff" />
          </TouchableOpacity>

          <View>
              <Text style={styles.sidebarItem}>용어설명</Text>
              <Text style={styles.sidebarItem}>접수</Text>
              <Text style={styles.sidebarItem}>처리 중</Text>
              <Text style={styles.sidebarItem}>완료</Text>
          </View>

          <TouchableOpacity onPress={() => console.log('설정 클릭')} style={styles.settingsIcon}>
              <Icon name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>

        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#595959',
    padding: 25,
    zIndex: 11,
  },
  sidebarItem: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#fff',
  },
    settingsIcon: {
      position: 'absolute',
      right: 20,
      bottom: 80,
    },
});
