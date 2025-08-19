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
    headerFont:{
        paddingBottom:10,
        fontSize:25,
        fontWeight:'bold',
        textAlign: 'center',
        color:'#696969',
        },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
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
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
})