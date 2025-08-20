// 일단 접수창 (ProcessingListScreen)과 같게 만들어둠.


import React, { useEffect, useState,useRef,useCallback} from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from '../../styles/ListScreenStyles';
import {PROCESSING_API_URL, API_KEY,PAGE_SIZE} from '../../config/config';

type Bill = {
  BILL_ID?: string;          // 의안 ID
  BILL_NO?: string;          // 의안 번호
  AGE : string;              // 대수
  BILL_NAME?: string;        // 의안명
  PROPOSER ?: string;        // 제안자
  PROPOSER_KIND ?:string;    //제안자 구분
  PROC_RESULT_CD ?: string;   //본회의심의결과
  CURR_COMMITTEE_ID? : string;//소관위코드
  CURR_COMMITTEE ?: string;   //소관위
};

type BillUI = {
  key: string;       // FlatList key
  title: string;     // 의안명
  idOrNo: string;    // [BILL_NO or BILL_ID]
  proposer: string; // 제안자구분
  result: string;   // 심의결과
  date?: string;     // 날짜(제안일/처리일 등)
  raw: Bill;         // 원본(필요시 상세 화면으로 전달)
};

export default function CompletedListScreen() {
  const [bills, setBills] = useState<BillUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  // Abort 이전 요청
  const abortPrev = () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
  };

  // 응답에서 rows 배열을 "루트 키 자동 탐색"으로 안전 추출
  const extractRows = (data: any): Bill[] => {
    if (!data || typeof data !== 'object') return [];
    const rootKey = Object.keys(data)[0];          // 예: 'TVBPMBILL11'
    const payload = data[rootKey];
    if (!payload) return [];

    // 보편 패턴: [0]=meta, [1]={row:[...]}
    if (Array.isArray(payload)) {
      const rows = payload[1]?.row ?? payload[0]?.row;
      if (Array.isArray(rows)) return rows as Bill[];
      // 혹시 [1] 자체가 배열인 경우 대응
      if (Array.isArray(payload[1])) return payload[1] as Bill[];
    }
    // 혹시 객체 루트에 row가 바로 있는 경우
    if (payload?.row && Array.isArray(payload.row)) {
      return payload.row as Bill[];
    }
    return [];
  };

  // Bill → UI 데이터 정규화
  const toUI = (item: Bill): BillUI => {
    const id = item.BILL_ID;
    const no = item.BILL_NO;
    const title = item.BILL_NAME ;
    const proposer = item.PROPOSER;
    const result = item.PROC_RESULT_CD;
    const date = item.PROC_DT;

    const key = String(id ?? no ?? title ?? Math.random());

    return {
      key,
      title: title,
      idOrNo: no ?? id ?? '-',
      proposer: proposer,
      result: result,
      date: date,
      raw: item,
    };
  };

  // 최신 정렬: 날짜(desc) → 번호/ID(desc)
  const sortLatest = (arr: BillUI[]) => {
    const toTs = (d?: string) => {
      if (!d) return 0;
      const t = Date.parse(d);
      return Number.isNaN(t) ? 0 : t;
    };
    const toNum = (v?: string) => {
      if (!v) return 0;
      const n = Number(v.replace?.(/[^\d.-]/g, '') ?? v);
      return Number.isNaN(n) ? 0 : n;
    };

    return [...arr].sort((a, b) => {
      const d = toTs(b.date) - toTs(a.date);
      if (d !== 0) return d;
      return toNum(b.idOrNo) - toNum(a.idOrNo);
    });
  };

  const fetchLatest = useCallback(async () => {
    abortPrev();
    try {
      setLoading(true);
      const res = await axios.get(PROCESSING_API_URL, {
        params: {
          KEY: API_KEY,
          Type: 'json',
          pIndex: 1,
          pSize: PAGE_SIZE,
          AGE : 22 //대수 는 하드 코딩 형태(기본은 22대)-> 이후에 정렬 시스템 도입 필요
        },
        signal: controllerRef.current!.signal,
      });

      // 필요시 원본 호출 데이터 확인
      // console.log('[RAW]', JSON.stringify(res.data, null, 2));

      const rows = extractRows(res.data);
      const ui = rows.map(toUI);
      setBills(sortLatest(ui));
    } catch (e: any) {
      if (e?.name !== 'CanceledError' && e?.code !== 'ERR_CANCELED') {
        console.error('API 호출 실패:', e?.message);
        if (e?.response) console.log('응답 내용:', e.response.data);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLatest();
    return () => controllerRef.current?.abort();
  }, [fetchLatest]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLatest();
  }, [fetchLatest]);

  const renderItem = useCallback(({ item }: { item: BillUI }) => (
    <View style={styles.item}>
      <Text style={styles.title}>[{item.idOrNo}] {item.title}</Text>
      <Text>제안자구분: {item.proposer}</Text>
      <Text>본회의 심의결과: {item.result}</Text>
      <Text>기준일자: {item.date}</Text>
    </View>
  ), []);

  const keyExtractor = useCallback((item: BillUI) => item.key, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bills.length === 0 ? (
        <Text style={{ padding: 20 }}>표시할 의안이 없습니다</Text>
      ) : (
          <>
          <Text style = {styles.headerFont}> 완료했습니다 </Text>

        <FlatList
          data={bills}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          initialNumToRender={10}
          windowSize={6}
          removeClippedSubviews
        />
        </>
      )}
    </View>
  );
}