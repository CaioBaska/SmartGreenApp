import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      display: 'flex',
      marginTop:20,
    },
    barContainer: {
      alignItems: 'center',
      marginHorizontal: 35,
      marginRight:40,
    },
    barContainer2: {
      alignItems: 'center',
      marginHorizontal: 35,
      marginRight:20,
    },
    texto:{
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom:5,
    },
    textoCirculo:{
      fontSize: 20,
    },
    titulo:{
      marginBottom: 40,
      marginTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    row2: {
      marginLeft: 210,
      paddingTop:80,
    },
    image: {
      width: 100,
      height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo do modal, ajuste conforme necessário
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop:20,
  },
  modalContent: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //display: 'flex',
    //marginTop:50,
    width: '100%',
    height:'100%', // Largura do conteúdo do modal, ajuste conforme necessário
    padding: 20,
    backgroundColor: 'white',
    //borderRadius: 10,
    //elevation: 5,
  },
  rowModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop:80,
    //marginBottom:0,
  },
  imagemSelecionada: {
    borderWidth: 5,
    borderColor: 'green', // Cor de destaque para indicar seleção
    borderRadius:10,
  },
  btnIniciar:{
    marginTop:50,
    marginLeft:10,
    backgroundColor: '#c9e265',
  },
  tituloModal:{
    marginBottom: 40,
    marginTop: 40,
    marginLeft:40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnMonit:{
    width: '70%',
    height: 48,
    backgroundColor: '#c9e265',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8
  },
  });