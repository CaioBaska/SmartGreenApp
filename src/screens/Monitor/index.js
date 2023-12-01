import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, Image } from 'react-native';
import {styles} from './styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export function Monitor({ navigation }) {

    const [data, setData] = useState([]);
    const umidadeString = data.length > 0 ? data[0].umidade.replace(',', '.') : '0';
    const umidadeNumerica = parseFloat(umidadeString);
  
    useEffect(() => {
      buscaDados();
      const interval = setInterval(buscaDados, 5000);
      return () => clearInterval(interval);
    }, []);

    const buscaDados = async () => {
      try {
        const response = await fetch('https://smartgreen.azurewebsites.net/Monitoramento/obterDados');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getProgressBarColor = value => {
      if (value >= 0 && value <= 20) {
        return '#00ff00'; // Verde claro
      } else if (value > 20 && value <= 40) {
        return '#008000'; // Verde escuro
      } else if (value > 40 && value <= 60) {
        return '#ffff00'; // Amarelo
      } else if (value > 60 && value <= 80) {
        return '#ffa500'; // Laranja
      } else if (value > 80 && value <= 100) {
        return '#ff0000'; // Vermelho
      }
      return '#000000'; // Preto (valor inválido)
    };

    const getProgressBarColorTemperatura = value => {
      // Converte a string para um número decimal
      const temperaturaNumerica = parseFloat(value.replace(',', '.'));
    
      if (temperaturaNumerica >= 0 && temperaturaNumerica <= 15) {
        return '#00ff00'; // Verde claro
      } else if (temperaturaNumerica > 15 && temperaturaNumerica <= 25) {
        return '#008000'; // Verde escuro
      } else if (temperaturaNumerica > 25 && temperaturaNumerica <= 30) {
        return '#ffff00'; // Amarelo
      } else if (temperaturaNumerica > 30 && temperaturaNumerica <= 35) {
        return '#ffa500'; // Laranja
      } else if (temperaturaNumerica > 35) {
        return '#ff0000'; // Vermelho
      }
      return '#000000'; // Preto (valor inválido)
    };

    const getProgressBarColorPH = value => {
      // Converte a string para um número decimal
      const phNumerica = parseFloat(value.replace(',', '.'));
      
      if (phNumerica >= 8 && phNumerica <= 9) {
        return '#00ff00'; // Verde claro
      } else if (phNumerica > 6 && phNumerica <= 8) {
        return '#008000'; // Verde escuro
      } else if (phNumerica > 5 && phNumerica <= 6) {
        return '#ffff00'; // Amarelo
      } else if (phNumerica > 3 && phNumerica <= 5) {
        return '#ffa500'; // Laranja
      } else if (phNumerica <= 3) {
        return '#ff0000'; // Vermelho
      }
      return '#000000'; // Preto (valor inválido)
    };
    
    const getProgressBarColorUmidade = value => {
      // Converte a string para um número decimal
      const umidadeNumerica = parseFloat(value.replace(',', '.'));
    
      if (umidadeNumerica >= 0 && umidadeNumerica <= 20) {
        return '#00ff00'; // Verde claro
      } else if (umidadeNumerica > 20 && umidadeNumerica <= 40) {
        return '#008000'; // Verde escuro
      } else if (umidadeNumerica > 40 && umidadeNumerica <= 60) {
        return '#ffff00'; // Amarelo
      } else if (umidadeNumerica > 60 && umidadeNumerica <= 80) {
        return '#ffa500'; // Laranja
      } else if (umidadeNumerica > 80) {
        return '#ff0000'; // Vermelho
      }
      return '#000000'; // Preto (valor inválido)
    };

    const getProgressBarFillPH = value => {
      // Converte a string para um número decimal
      const phNumerica = parseFloat(value.replace(',', '.'));
    
      if (phNumerica >= 8 && phNumerica <= 9) {
        return 0; // Valor máximo, verde claro
      } else if (phNumerica > 6 && phNumerica <= 8) {
        return 25; // Valor intermediário, verde escuro
      } else if (phNumerica > 5 && phNumerica <= 6) {
        return 50; // Valor intermediário, amarelo
      } else if (phNumerica > 3 && phNumerica <= 5) {
        return 75; // Valor intermediário, laranja
      } else if (phNumerica <= 3) {
        return 100; // Valor mínimo, vermelho
      }
      return 0; // Valor padrão (valor inválido)
    };

    const getProgressBarFill = (value, minValue, maxValue) => {
      const numericValue = parseFloat(value.replace(',', '.'));
    
      if (numericValue >= maxValue) {
        return 100; // Valor máximo, preenchimento completo
      } else if (numericValue <= minValue) {
        return 0; // Valor mínimo, nenhum preenchimento
      } else {
        return ((numericValue - minValue) / (maxValue - minValue)) * 100;
      }
    };
    
    
    return (
<View style={styles.container}>
  <Text style={styles.titulo}>Monitoramento</Text>
  {data.length > 0 ? (
    <>
      <View style={styles.row}>
        <View style={styles.barContainer2}>
          <Text style={styles.texto}>Temperatura: {data[0].temperatura}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            //fill={fillValue}
            //fill={(parseFloat(data[0].temperatura.replace(',', '.')) > 40 ? 40 : parseFloat(data[0].temperatura.replace(',', '.'))) * (100 / 40)}
            fill={getProgressBarFill(data[0].temperatura, 0, 40)}
            tintColor={getProgressBarColorTemperatura(data[0].temperatura)}
            backgroundColor="#3d5875"
          />
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.texto}>pH: {data[0].ph}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFillPH(data[0].ph)}
            tintColor={getProgressBarColorPH(data[0].ph)}
            backgroundColor="#3d5875"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.barContainer2}>
          <Text style={styles.texto}>Umidade: {data[0].umidade}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={umidadeNumerica}
            tintColor={getProgressBarColorUmidade(data[0].umidade)}
            backgroundColor="#3d5875"
          />
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.texto}>Fósforo: {data[0].fosforo}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].fosforo, 0, 100)}
            tintColor={getProgressBarColor(data[0].fosforo)}
            backgroundColor="#3d5875"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.barContainer2}>
          <Text style={styles.texto}>Nitrogênio: {data[0].nitrogenio}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].nitrogenio, 0, 100)}
            tintColor={getProgressBarColor(data[0].nitrogenio)}
            backgroundColor="#3d5875"
          />
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.texto}>Potássio: {data[0].potassio}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].potassio, 0, 100)}
            tintColor={getProgressBarColor(data[0].potassio)}
            backgroundColor="#3d5875"
          />
        </View>
      </View>
        {/* <View style={styles.barContainer}>
          <Text style={styles.texto}>Luminosidade: {data[0].luminosidade}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].luminosidade, 0, 100)}
            tintColor={getProgressBarColor(data[0].luminosidade)}
            backgroundColor="#3d5875"
          />
        </View> */}
      {/* <View>
        <TouchableOpacity style={styles.row2}>
            <Text> BOTAO</Text>
            <Image 
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/grafico.png')} 
            />
          </TouchableOpacity>
      </View> */}
    </>
  ) : (
    <Text>Aguardando dados...</Text>
  )}
</View>
);
};
  

