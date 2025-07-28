import { Platform,StyleSheet } from 'react-native';
import {shadowStyle} from '../styles/library/shadow';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    bodyBlock:{
        padding:10,
        Width:340,
        height:100,
        borderRadius: 15,
        margin:5,
        backgroundColor:'#fff',
        ...shadowStyle,
        },

    TitleFont:{
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        },
    blockHeadingFont:{
        fontSize:20,
        fontWeight:'bold',
        padding:10,
        },
    blockBodyFont:{
        fontSize:15,
        padding:10,
        lineHeight:22,
        }
})