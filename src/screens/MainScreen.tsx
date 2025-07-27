import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 아이콘 import
import styles from '../styles/globalStyles';

export default function MainScreen() {
  return (
    <>
      {/* 최근 열람 */}
      <View style={styles.recentOpen}>
        <Text style={styles.detailTitleFont}>최근 열람</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.recentOpenBlock} />
          <View style={styles.recentOpenBlock} />
          <View style={styles.recentOpenBlock} />
        </ScrollView>
      </View>

      {/* 인기 검색어 */}
      <View style={styles.hotIssue}>
        <View style={styles.hotIssueColoredBox}>
          <Text style={styles.hotIssueFont}> 인기 검색어 </Text>
          <Text style={styles.hotIssueFont}>1. 안녕하세요</Text>
        </View>
      </View>

      {/* 접수되었습니다 */}
      <View style={styles.basic}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
          <Text style={styles.detailTitleFont}>접수되었습니다</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={styles.fullViewFont}>전체보기</Text>
            <Icon name="chevron-forward-outline" size={20} color="#000" style={{ marginLeft: 4 }} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={[styles.basicBlock, { backgroundColor: '#FFE9E9' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
        </ScrollView>
      </View>

      {/* 처리중입니다 */}
      <View style={styles.basic}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
          <Text style={styles.detailTitleFont}>처리중입니다</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.fullViewFont}>전체보기</Text>
            <Icon name="chevron-forward-outline" size={20} color="#000" style={{ marginLeft: 4 }} />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={[styles.basicBlock, { backgroundColor: '#FFE9E9' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
        </ScrollView>
      </View>
    </>
  );
}
