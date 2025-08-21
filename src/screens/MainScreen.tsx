import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; //브라우저나 Node.js환경에서 서버에 요청을 보내고 응답을 받는 도구
import styles from '../styles/MainScreenStyles';
import { BILL_INFO_KEY, BILL_INFO_URL } from '../config/config';

/** ---------- 타입 ---------- */
type RawBill = {
  billId?: string;
  billNo?: string;
  billName?: string;
  proposerKind?: string;
  proposeDt?: string;  // 제안일자
  procDt?: string;     // 의결일자
  summary?: string;    // 제안이유 및 주요내용
  rcptDt?: string;     // 접수일자
  currCommittee?: string;
};

export type BillItem = {
  id: string;
  no?: string;
  title: string;
  proposerKind?: string;
  proposeDt?: string;
  rcptDt?: string;
  procDt?: string;
  summary?: string;
  committee?: string;
};

function pickListFromAny(json: any): RawBill[] {
  const cand1 = json?.response?.body?.items?.item;
  if (Array.isArray(cand1)) return cand1;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json)) return json as RawBill[];
  return [];
}

function mapBill(b: RawBill): BillItem {
  return {
    id: b.billId ?? `${b.billNo ?? ''}-${b.proposeDt ?? ''}`,
    no: b.billNo,
    title: b.billName ?? '(제목 없음)',
    proposerKind: b.proposerKind,
    proposeDt: b.proposeDt,
    rcptDt: b.rcptDt,
    procDt: b.procDt,
    summary: b.summary,
    committee: b.currCommittee,
  };
}

function byDateDesc(a?: string, b?: string) {
  const norm = (s?: string) => (s ? String(s).replaceAll('-', '') : '');
  const na = norm(a), nb = norm(b);
  if (!na && !nb) return 0;
  if (!na) return 1;
  if (!nb) return -1;
  return nb.localeCompare(na);
}

/** ---------- API 호출 (최신 접수 5건) ---------- */
async function fetchLatest5Bills(): Promise<BillItem[]> {
  const url = `${BILL_INFO_URL}/getBillInfoList`;
  const params = {
    serviceKey: BILL_INFO_KEY,
    pageNo: 1,
    numOfRows: 20, // 조금 넉넉히 받아서 아래에서 정렬 후 5개만 슬라이스
    type: 'json',
  };

  const { data } = await axios.get(url, { params });
  let list = pickListFromAny(data).map(mapBill);

  list.sort((A, B) => {
    const byRcpt = byDateDesc(A.rcptDt, B.rcptDt);
    if (byRcpt !== 0) return byRcpt;
    return byDateDesc(A.proposeDt, B.proposeDt);
  });

  return list.slice(0, 5);
}

const ReceivedBillCard = memo(({ item }: { item: BillItem }) => {
  return (
    <View style={[styles.basicBlock, { backgroundColor: '#EAF5FF', padding: 12 }]}>
      <Text style={styles.basicBlockFont} numberOfLines={2}>
        {item.title}
      </Text>

      {!!item.summary && ( //나중에 GPT로 요약 시스템 적용
        <Text style={styles.basicBlockDetailFont}>
          {item.summary}
        </Text>
      )}

      <Text style={ styles.basicBlockNumberFont }>
        {item.no ? ` ${item.no}` : ''}{item.committee ? `소관위 ${item.committee}` : ''}
      </Text>
      <Text style={ styles.basicBlockDetailFont}>
        {item.rcptDt ? `접수일: ${item.rcptDt}` : (item.proposeDt ? `제안일 ${item.proposeDt}` : '')}
      </Text>

      <Text style={ styles.basicBlockDetailFont}>
        {item.procDt ? `처리일: ${item.procDt}` : ''}
      </Text>
    </View>
  );
});

type Props = {
  onReceivedListPress: () => void;
  onProcessingListPress: () => void;
  onCompletedListPress: () => void;
};

export default function MainScreen({onReceivedListPress,onProcessingListPress, onCompletedListPress,}: Props) {
  const [latestReceived, setLatestReceived] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);
      const list = await fetchLatest5Bills();
      setLatestReceived(list);
    } catch (e: any) {setErr(e?.message ?? '불러오기 실패');
    } finally {setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <View style={styles.recentOpen}>
        <Text style={styles.detailTitleFont}>최근 열람</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
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

        {loading ? (
          <View style={{ paddingVertical: 16, alignItems: 'center' }}>
            <ActivityIndicator />
            <Text style={{ marginTop: 6, color: '#666' }}>최신 접수 의안을 불러오는 중…</Text>
          </View>
        ) : err ? (
          <View style={{ paddingVertical: 16, alignItems: 'center' }}>
            <Text style={{ color: '#c0392b', fontWeight: '600' }}>오류: {err}</Text>
            <Text style={{ color: '#666', marginTop: 6 }} onPress={load}>다시 시도하려면 탭하세요</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {latestReceived.map((item) => (
              <ReceivedBillCard key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>

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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
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
