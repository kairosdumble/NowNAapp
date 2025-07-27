import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import AppBar from './src/components/AppBar';
import MainScreen from './src/screens/MainScreen';
import Sidebar from './src/components/Sidebar';
import SearchScreen from './src/screens/SearchScreen';
import ProcessingListScreen from './src/screens/ProcessingListScreen';
import ReceivedListScreen from './src/screens/ReceivedListScreen';

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [ProcessingListVisible,setProcessingListVisible] =useState(false);
  const [ReceivedListVisible,setReceivedListVisible] =useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      <ScrollView>
        <AppBar
            onMenuPress={() =>
                setSidebarVisible(true)
            }
            onHomePress={() => {
                setHomeVisible(true);
                setSearchVisible(false);
            }}
          onSearchPress={() => {
              setHomeVisible(false);
              setSearchVisible(true);
          }}
        />

        {homeVisible && <MainScreen
            onReceivedListPress={()=>{
                ReceivedListVisible(false);
                setReceivedListVisible(true);
                }}
            onProcessingListPress={()=>{
                ProcessingListVisible(false);
                setProcessingListVisible(true);
                }}

            />}

        {searchVisible && (<SearchScreen
            onBack={() => {
                setSearchVisible(false);
                setHomeVisible(true);
            }}
        />)}

      </ScrollView>
    </SafeAreaView>
  );
}
