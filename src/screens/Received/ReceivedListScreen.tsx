import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from '../../styles/ListScreenStyles';
import { API_KEY, API_URL } from '../../config/config';

const PAGE_SIZE_FALLBACK = 50;

type Bill = {
  BILL_ID?: string;
  BILL_NO?: string;
  AGE ?: string;
  BILL_NAME?: string;
  PROPOSER ?: string;
  PROPOSER_KIND ?:string;
  CURR_COMMITTEE_ID? : string;
  CURR_COMMITTEE ?: string;
  PROC_RESULT_CD ?: string;
  PROC_DT?: string;
};

type BillUI = {
  key: string;       // FlatList key
  title: string;     // 의안명
  idOrNo: string;    // [BILL_NO or BILL_ID]
  proposer?: string; // 제안자구분
  result?: string;   // 심의결과
  date?: string;     // 날짜(제안일/처리일 등)
  raw: Bill;         // 원본(필요시 상세 화면으로 전달)
};

export default function BillsLatestScreen() {
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
    const id = item.BILL_ID ?? item.billId ?? item.id;
    const no = item.BILL_NO ?? item.billNo ?? item.no;
    const title =
      item.BILL_NM ??
      item.BILL_NAME ??
      item.BILL_TITLE ??
      item.title ??
      '(제목 없음)';

    const proposer =
      item.PPSR_KND ?? item.proposerKind ?? item.PROPOSER ?? item.proposer;

    const result =
      item.RGS_CONF_RSLT ??
      item.PROC_RESULT ??
      item.result ??
      item.status;

    // 날짜 후보들 중 하나 선택
    const date =
      item.PPSL_DT ??
      item.PROC_DT ??
      item.DATE ??
      item.regDate ??
      undefined;

    const key = String(id ?? no ?? title ?? Math.random());

    return {
      key,
      title: String(title),
      idOrNo: String(no ?? id ?? '-'),
      proposer: proposer ? String(proposer) : undefined,
      result: result ? String(result) : undefined,
      date: date ? String(date) : undefined,
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

      const res = await axios.get(API_URL, {
        params: {
          KEY: API_KEY,
          Type: 'json',
          pIndex: 1,
          pSize: PAGE_SIZE_FALLBACK, // config에 export 안 되어 있으므로 기본 5 사용
        },
        signal: controllerRef.current!.signal,
      });

      // 필요시 원본 확인
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
      {item.proposer ? <Text>제안자구분: {item.proposer}</Text> : null}
      {item.result ? <Text>본회의 심의결과: {item.result}</Text> : null}
      {item.date ? <Text>기준일자: {item.date}</Text> : null}
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
      )}
    </View>
  );
}
