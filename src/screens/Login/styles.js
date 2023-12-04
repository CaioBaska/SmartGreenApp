import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    logoContainer:{
        marginBottom:50,
    },
    inputContainer:{
        marginBottom:10,
    },
    buttonContainer:{
        marginTop: 10,
        marginBottom:80,
    },
    buttonContainerModal:{
        marginTop: 80,
        //marginBottom:80,
    },
    fontEsqueci:{
        color:'#0066ff',
        fontSize:15,
        textDecorationLine: 'underline',
        marginLeft:70,
        marginBottom:15,
    },
    modalView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 32,
        marginTop:10
        //top: -10
    },
    separator: {
        borderWidth: 0.5,
        width: '92%',
        top: -20
    },
    image: {
        width: 300,
        height: 450,
    },
    Info: {
        color: 'red'
    }
})