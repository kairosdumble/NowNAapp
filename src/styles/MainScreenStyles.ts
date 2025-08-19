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
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sidebarIcon: {
    position: 'absolute',
    top: 45,
    left: 24,
  },
  searchIcon: {
    position: 'absolute',
    top: 45,
    right: 24,
  },
  detailTitleFont: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  recentOpen: {
    padding: 20,
    flex: 1,
    backgroundColor: '#E4EFBB',
    ...shadowStyle,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  recentOpenBlock: {
    width: 250,
    height: 180,
    backgroundColor: '#fff',
    marginRight: 16,
    borderRadius: 22,
    margin:5,
    ...shadowStyle,
  },

  basic: {
    padding: 24,
    backgroundColor: '#FFF',
    ...shadowStyle,
  },
  basicBlock:{
      padding:24,
      width: 250,
      height: 180,
      margin:5,
      borderRadius: 22,
      ...shadowStyle,
  },
    fullViewFont:{
        fontSize:15,
        opacity: 0.5,
    },
  information: {
    padding: 24,
    backgroundColor: '#FFF',
  },
});
