import { Platform,StyleSheet } from 'react-native';
import {shadowStyle} from '../styles/library/shadow';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:30,
    },
    appBar: {
        flexDirection: 'row',         // 아이템을 가로 배치
        alignItems: 'center',         // 세로 정렬 가운데
        justifyContent: 'space-between', // 좌우 양 끝 정렬
        paddingHorizontal: 24,        // 좌우 여백
        paddingTop: 20,
        backgroundColor: '#fff',
    },
  appTitle: { //지금 국회는
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sidebarIcon: { //사이드 바 아이콘
    position: 'absolute',
    top: 45,
    left: 24,
  },
  searchIcon: { //검색창 아이콘
    position: 'absolute',
    top: 45,
    right: 24,
  },
  detailTitleFont: { // 소제목(최근 열람,접수되었습니다 등등)
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  recentOpen: { //최근 열람한 의안의 배경
    padding: 20,
    flex: 1,
    backgroundColor: '#E4EFBB',
    ...shadowStyle,
  },

  scrollContainer: { //스크롤
    flexDirection: 'row',
  },

  recentOpenBlock: { //최근 열람한 의안 블럭
    width: 250,
    height: 180,
    backgroundColor: '#fff',
    marginRight: 16,
    borderRadius: 22,
    margin:5,
    ...shadowStyle,
  },

  basic: {  // 접수되었습니다, 완료되었습니다 배경
    padding: 24,
    backgroundColor: '#FFF',
    ...shadowStyle,
  },
  basicBlock:{ // 접수되었습니다, 완료되었습니다 블럭
      padding:24,
      width: 250,
      height: 180,
      margin:5,
      borderRadius: 22,
      ...shadowStyle,
  },
    fullViewFont:{ // 전체보기 버튼 글씨체
        textAlign:'right',
        fontSize:15,
        opacity: 0.5,
    },
    basicBlockFont:{           //접수/처리/완료 제목글씨체
        fontSize: 18,
        fontWeight: 'bold',
    },
    basicBlockDetailFont:{     //접수/처리/완료 블럭 상세정보 글씨체
        fontSize: 15,
        color: '#555',
    },
    basicBlockNumberFont:{     //접수/처리/완료 블럭 상세정보 중 의안번호 글씨체
        fontSize:12,
        fontWeight: 'bold',
        opacity: 0.5,
    },
  bottomInformation: {         //하단 정보 블럭
    padding: 24,
    backgroundColor: '#FFF',
    ...shadowStyle,
  },
  bottomInformationFont:{ //하단 정보 블럭 폰트
      fontSize:15,
      opacity:0.5,
      }
});
