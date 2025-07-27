import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import AppBar from './src/components/AppBar';
import MainScreen from './src/screens/MainScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import AcceptedScreen from './src/screens/AcceptedScreen';
import Information from './src/components/Information';
import Sidebar from './src/components/Sidebar';

export default function App() {
    // sidebarVisible: 사이드바 열림여부, setSidebarVisible:상태 변경함수,
    // true: 보임, false: 숨김
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
      // iPhone 노치, 안드로이드 상단바 등 기기 경계 영역을 피해 UI가 그려지게 해주는 컴포넌트
    <SafeAreaView style={{ flex: 1 }}>
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <ScrollView >
        <AppBar onMenuPress={() => setSidebarVisible(true)} />
        <MainScreen />
        <Information />
      </ScrollView>
    </SafeAreaView>
  );
}
