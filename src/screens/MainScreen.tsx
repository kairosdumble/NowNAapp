import React, { useState }  from 'react';
import { View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/MainScreenStyles';
import {API_KEY,API_URL} from '../../config/config';

type Props = {
    onReceivedListPress: () => void;
    onProcessingListPress:() =>void;
    onCompletedListPress:() =>void;
};

export default function MainScreen({onReceivedListPress,onProcessingListPress,onCompletedListPress} :Props) {

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

      {/* 접수되었습니다 */}
      <View style={styles.basic}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
          <Text style={styles.detailTitleFont}>접수되었습니다</Text>
          <TouchableOpacity onPress={onReceivedListPress}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={styles.fullViewFont}>전체보기</Text>
                <Icon name="caret-forward-outline" size={20} color="#000" style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={[styles.basicBlock, { backgroundColor: '#FFE9E9' }]}>
               <Text>1번</Text>
          </View>

          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]}>
                <Text>1번</Text>
          </View>
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
          <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF' }]} />
        </ScrollView>
      </View>

      {/* 처리중입니다*/}
      <View style={styles.basic}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
          <Text style={styles.detailTitleFont}>처리중입니다</Text>
          <TouchableOpacity onPress={onProcessingListPress}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.fullViewFont}>전체보기</Text>
                <Icon name="caret-forward-outline" size={20} color="#000" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
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

      {/* 완료되었습니다*/}
      <View style={styles.basic}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
          <Text style={styles.detailTitleFont}>완료되었습니다</Text>
          <TouchableOpacity onPress={onCompletedListPress}>
              <View style={{ flexDirection: 'row', alignItems: 'right' }}>
                <Text style={styles.fullViewFont}>전체보기</Text>
                <Icon name="caret-forward-outline" size={20} color="#000" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={[styles.basicBlock, { backgroundColor: '#e6e6e6' }]}>
                <Text>1번</Text>
          </View>

          <View style={[styles.basicBlock, { backgroundColor: '#e6e6e6' }]}>
            <Text>2번</Text>
          </View>

          <View style={[styles.basicBlock, { backgroundColor: '#e6e6e6' }]}>
            <Text>3번</Text>
          </View>

          <View style={[styles.basicBlock, { backgroundColor: '#e6e6e6' }]}>
            <Text>4번</Text>
          </View>

          <View style={[styles.basicBlock, { backgroundColor: '#e6e6e6' }]}>
            <Text>5번</Text>
          </View>
        </ScrollView>
      </View>

    </>
  );
}
