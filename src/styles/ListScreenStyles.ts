import { Platform,StyleSheet } from 'react-native';
import {shadowStyle} from '../styles/library/shadow';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    bodyBlock:{
        padding:10,
        width:340,
        height:100,
        borderRadius: 15,
        margin:5,
        backgroundColor:'#fff',
        ...shadowStyle,
        },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        },
    blockHeadingFont:{
        fontSize:15,
        fontWeight:'bold',
        padding:10,
        },
    blockBodyFont:{
        fontSize:15,
        padding:10,
        lineHeight:22,
        },
    item: {
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
})