import React, { useState, createRef } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import {NavigationContainer,NavigationContainerRef,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppBar from './src/components/AppBar';
import Sidebar from './src/components/Sidebar';
import BottomInformation from './src/components/BottomInformation';

import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProcessingListScreen from './src/screens/Processing/ProcessingListScreen';
import DetailProcessingScreen from './src/screens/Processing/DetailProcessingScreen';
import ReceivedListScreen from './src/screens/Received/ReceivedListScreen';
import DetailReceivedScreen from './src/screens/Received/DetailReceivedScreen';
import WordExplanationScreen from './src/screens/WordExplanationScreen';
import CompletedListScreen from './src/screens/CompletedListScreen';
export const navigationRef = createRef<NavigationContainerRef<any>>();

const Stack = createNativeStackNavigator();

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{ flex: 1 }}>
        <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          onWordExplainPress={() => {
            setSidebarVisible(false);
            navigationRef.current?.navigate('WordExplanation');
          }}
          onReceivedPress={() => {
            setSidebarVisible(false);
            navigationRef.current?.navigate('ReceivedList');
          }}
          onProcessingPress={() => {
            setSidebarVisible(false);
            navigationRef.current?.navigate('ProcessingList');
          }}
          onCompletedPress={() => {
            setSidebarVisible(false);
            navigationRef.current?.navigate('CompletedList');
          }}
        />

        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
          {/* 메인 화면 */}
          <Stack.Screen name="Main">
            {({ navigation }) => (
              <>
                <AppBar
                  onMenuPress={() => setSidebarVisible(true)}
                  onHomePress={() => navigation.navigate('Main')}
                  onSearchPress={() => navigation.navigate('Search')}
                />
                <ScrollView>
                  <MainScreen
                    onReceivedListPress={() => navigation.navigate('ReceivedList')}
                    onProcessingListPress={() => navigation.navigate('ProcessingList')}
                  />
                  <BottomInformation />
                </ScrollView>
              </>
            )}
          </Stack.Screen>

          {/* 검색 화면 */}
          <Stack.Screen name="Search">
            {({ navigation }) => (
              <SearchScreen
                onBack={() => navigation.goBack()}
                onSortSearchPress={() => {}}
              />
            )}
          </Stack.Screen>

          {/* 처리중 리스트 스크린 */}
          <Stack.Screen name="ProcessingList">
            {({ navigation }) => (
              <ProcessingListScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>

          {/* 접수된 리스트 스크린 */}
          <Stack.Screen name="ReceivedList">
            {({ navigation }) => (
              <ReceivedListScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>

          {/* 용어 설명 스크린 */}
          <Stack.Screen name="WordExplanation">
            {({ navigation }) => (
              <WordExplanationScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>

          {/* 완료 스크린*/}
          <Stack.Screen name="CompletedList">
            {({ navigation }) => (
                <CompletedListScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
