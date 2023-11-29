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
    },
    barContainerTemperatura: {
      alignItems: 'center',
      marginHorizontal: 25,
    },
    barContainerUmidade: {
      alignItems: 'center',
      marginHorizontal: 35,
      marginLeft:60,
    },
    barContainerNitrogenio: {
      alignItems: 'center',
      marginHorizontal: 45,
      marginLeft:40,
    },
    barContainerFosforo: {
      alignItems: 'center',
      marginHorizontal: 25,
      marginRight:10,
    },
    texto:{
      fontSize: 10,
      fontWeight: 'bold',
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
  });