import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from '../../styles/ListScreenStyles';
import {API_KEY,API_URL} from '../../config/config';

export default function ProcessingListScreen({ onBack }: { onBack: () => void }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          KEY: API_KEY,
          Type: 'json',
          pIndex: 1,
          pSize: 20,
        },
      });

      console.log('✅ 응답 성공:', JSON.stringify(response.data, null, 2));
      const items = response.data.ALLBILL?.[1]?.row || [];
      setBills(items);
      console.log('📦 받아온 의안 수:', items.length);
    } catch (error: any) {
      console.error('❌ API 호출 실패:', error.message);
      if (error.response) {
        console.log('❌ 응답 내용:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.BILL_KND} - {item.BILL_NO}</Text>
      <Text>의안명: {item.BILL_NM}</Text>
      <Text>제안자구분: {item.PPSR_KND}</Text>
      <Text>본회의 심의결과: {item.RGS_CONF_RSLT}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={onBack} style={{ padding: 10 }}>
        <Text style={{ color: '#007AFF' }}>← 뒤로가기</Text>
      </TouchableOpacity>

      {/* 로딩 중 */}
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : bills.length === 0 ? (
        <Text style={{ padding: 20 }}>표시할 의안이 없습니다.</Text>
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
