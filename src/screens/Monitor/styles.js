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
    marginTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 35,
    marginRight: 40,
  },
  barContainer2: {
    alignItems: 'center',
    marginHorizontal: 35,
    marginRight: 20,
  },
  texto: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textoCirculo: {
    fontSize: 20,
  },
  titulo: {
    marginLeft: 120,
    marginBottom: 40,
    marginTop: -30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row2: {
    marginLeft: 210,
    paddingTop: 80,
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
    marginTop: 20,
  },
  modalContent: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //display: 'flex',
    //marginTop:50,
    width: '100%',
    height: '100%', // Largura do conteúdo do modal, ajuste conforme necessário
    padding: 20,
    backgroundColor: 'white',
    //borderRadius: 10,
    //elevation: 5,
  },
  rowModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: 80,
    //marginBottom:0,
  },
  imagemSelecionada: {
    borderWidth: 5,
    borderColor: 'green', // Cor de destaque para indicar seleção
    borderRadius: 10,
  },
  btnIniciar: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#c9e265',
    justifyContent: 'space-between',
    
  },
  tituloModal: {
    marginBottom: 40,
    marginTop: 40,
    marginLeft: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnOpcao: {
    marginLeft: 180,
    marginTop: 80,
    //borderRadius:10,
    //borderWidth:10,
  },
  txtInpuMask: {
    backgroundColor: '#F8F9FA',
    height: 45,
    fontSize: 18,
    fontWeight: 'bold'
  },
  tituloRelatorio: {
    marginBottom: 40,
    marginTop: 60,
    marginLeft: 130,
    fontSize: 20,
    fontWeight: 'bold',
  }, container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#F8F9FA'
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff'
  },
  btnRetornaMonitoramento: {
    marginLeft: 175,
    marginBottom: 10,
  },
  botoesMonitoramento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 40,
  },
  btnEditarPlanta: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
    //marginLeft:145,
    //marginRight:145,
    //borderRadius:5,
    //borderWidth:5,
  },
  txtEditarPlanta: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnCriarPlanta: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Info: {
    marginTop:10,
    marginBottom:20,
    color: 'red'
  },
  barContainerCentro:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  botoesRelatorio:{
    marginTop:200,
  }
});