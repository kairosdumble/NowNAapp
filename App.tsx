import React, { useState, createRef } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import {NavigationContainer,NavigationContainerRef,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppBar from './src/components/AppBar';
import BottomInformation from './src/components/BottomInformation';
import Sidebar from './src/components/Sidebar';
import HotIssue from './src/components/HotIssue'

import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProcessingListScreen from './src/screens/Processing/ProcessingListScreen';
import DetailProcessingScreen from './src/screens/Processing/DetailProcessingScreen';
import ReceivedListScreen from './src/screens/Received/ReceivedListScreen';
import DetailReceivedScreen from './src/screens/Received/DetailReceivedScreen';
import WordExplanationScreen from './src/screens/WordExplanationScreen';
import CompletedListScreen from './src/screens/CompletedListScreen';
import SettingScreen from './src/screens/SettingScreen';


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
          onSettingPress={() => {
              setSidebarVisible(false);
              navigationRef.current?.navigate('Setting');
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
                  <HotIssue/>
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
                <>
                <AppBar
                  onMenuPress={() => setSidebarVisible(true)}
                  onHomePress={() => navigation.navigate('Main')}
                  onSearchPress={() => navigation.navigate('Search')}
                />
                <ScrollView>
                    <ProcessingListScreen onBack={() => navigation.goBack()} />
                </ScrollView>
               </>
            )}
          </Stack.Screen>

          {/* 접수된 리스트 스크린 */}
          <Stack.Screen name="ReceivedList">
            {({ navigation }) => (
                <>
                <AppBar
                  onMenuPress={() => setSidebarVisible(true)}
                  onHomePress={() => navigation.navigate('Main')}
                  onSearchPress={() => navigation.navigate('Search')}
                />
                <ScrollView>
                    <ReceivedListScreen onBack={() => navigation.goBack()} />
                </ScrollView>
                </>
            )}
          </Stack.Screen>

          {/* 용어 설명 스크린 */}
          <Stack.Screen name="WordExplanation">
            {({ navigation }) => (
                <>
                <AppBar
                  onMenuPress={() => setSidebarVisible(true)}
                  onHomePress={() => navigation.navigate('Main')}
                  onSearchPress={() => navigation.navigate('Search')}
                />
                <ScrollView>
                    <WordExplanationScreen onBack={() => navigation.goBack()} />
                </ScrollView>
                </>
            )}
          </Stack.Screen>

          {/* 완료 스크린*/}
          <Stack.Screen name="CompletedList">
            {({ navigation }) => (
                <>
                <AppBar
                  onMenuPress={() => setSidebarVisible(true)}
                  onHomePress={() => navigation.navigate('Main')}
                  onSearchPress={() => navigation.navigate('Search')}
                />
                <ScrollView>
                    <CompletedListScreen onBack={() => navigation.goBack()} />
                </ScrollView>
                </>
            )}
          </Stack.Screen>

          {/*설정 스크린 */}
          <Stack.Screen name="Setting">
            {({ navigation }) => (
                <ScrollView>
                    <SettingScreen onBack={() => navigation.goBack()}/>
                </ScrollView>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
