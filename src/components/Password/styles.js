import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
        backgroundColor:'#F8F9FA',
        borderColor:'#E4E7EB',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 8
    },
    icon: {
        marginHorizontal: 10,
        backgroundColor:'#F8F9FA',
    },
    iconEye:{
        marginLeft: 30,
        marginRight:10,
    },
    txtInput: {
        backgroundColor:'#F8F9FA',
        width: '63%',
        height: 45,
        fontSize: 18,
        fontWeight: 'bold'
    },
});