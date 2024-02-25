import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  center: {

  },
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
    width: 120,
    height: 120,
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
    marginTop: 60,
    //marginBottom:0,
  },
  imagemSelecionada: {
    borderWidth: 5,
    borderColor: 'green', // Cor de destaque para indicar seleção
    borderRadius: 10,
  },
  btnIniciar: {
    marginTop: 13,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#c9e265',
    justifyContent: 'space-between',

  },
  tituloModal: {
    //marginBottom: 20,
    marginTop: 60,
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tituloRelatorio: {
    marginBottom: 40,
    marginTop: 100,
    marginLeft: 130,
    fontSize: 20,
    fontWeight: 'bold',
  }, GeraRelatorioinput: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
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
    marginLeft: 90,
    marginRight: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botoesMonitoramento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginLeft: 50,
    marginRight: 50,
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
    color: 'red',
  },
  infoSelecionadasStyle: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainerCentro: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botoesGeraRelatorio: {
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',

  },
  tituloRelatorioEmail: {
    marginBottom: 40,
    marginTop: 60,
    marginLeft: 80,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnEnviarEmail: {
    marginTop: 20,
    marginLeft: 70,
    marginRight: -40,
  },
  botoesEnviarEmail: {
    marginTop: 80,
    marginLeft: 70,
    marginRight: -40,
  },
  monitorPicker: {
    marginTop: 50,
    marginBottom: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editMenuButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  infoCadastroPlantaStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});