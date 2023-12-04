import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, Image,Modal,Button,Alert } from 'react-native';
import {styles} from './styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export function Monitor({ navigation }) {

    const [data, setData] = useState([]);
    const [plantaData,SetPlantaData]=useState([]);

    const umidadeString = data.length > 0 ? data[0].umidade.replace(',', '.') : '0';
    const umidadeNumerica = parseFloat(umidadeString);
    const [umidadeAlertVisible, setUmidadeAlertVisible] = useState(true);

    const nitrogenioString = plantaData.length > 0 ? plantaData[0].nitrogenio.replace(',', '.') : '0';
    const nitrogenioNumerica = parseFloat(nitrogenioString);
    const [nitrogenioAlertVisible, setNitrogenioAlertVisible] = useState(true);

    const fosforoString = data.length > 0 ? data[0].fosforo.replace(',', '.') : '0';
    const fosforoNumerico = parseFloat(fosforoString);
    const [fosforoAlertVisible, setFosforoAlertVisible] = useState(true);

    const potassioString = data.length > 0 ? data[0].potassio.replace(',', '.') : '0';
    const potassioNumerico = parseFloat(potassioString);
    const [potassioAlertVisible, setPotassioAlertVisible] = useState(true);

    const temperaturaString = data.length > 0 ? data[0].temperatura.replace(',', '.') : '0';
    const temperaturaNumerica = parseFloat(temperaturaString);
    const [temperaturaAlertVisible, setTemperaturaAlertVisible] = useState(true);
    

    const phString = data.length > 0 ? data[0].ph.replace(',', '.') : '0';
    const phNumerico = parseFloat(phString);
    const [phAlertVisible, setPhAlertVisible] = useState(true);

    const [modalVisible, setModalVisible] = useState(true); // Adicionado estado para controlar a visibilidade do modal
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [nomePlantaSelecionada, setNomePlantaSelecionada] = useState('');


    const closeModal = () => {
      setModalVisible(false); // Função para fechar o modal
    };
  
    useEffect(() => {
      buscaDados();
      const interval = setInterval(buscaDados, 5000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const alertTimeout = setTimeout(() => {
        setFosforoAlertVisible(true);
        setNitrogenioAlertVisible(true);
        setPhAlertVisible(true);
        setUmidadeAlertVisible(true);
        setTemperaturaAlertVisible(true);
        setPotassioAlertVisible(true);
      }, 60000); // 60000 milissegundos = 1 minuto
  
      return () => clearTimeout(alertTimeout);
    }, [fosforoAlertVisible]);

    const buscaDados = async () => {
      try {
        const response = await fetch('https://smartgreen.azurewebsites.net/Monitoramento/obterDados');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    const handleIniciarMonitoramento = async () => {
      try {
        const response = await fetch(`https://smartgreen.azurewebsites.net/Plantas/obterDadosPlantas?nomePlanta=${imagemSelecionada}`, {
          method: 'GET', // Alterado para POST
        });
        
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
        }
    
        const text = await response.text();
    
        if (!text) {
          throw new Error('Resposta vazia ou não no formato JSON esperado.');
        }
    
        const json = JSON.parse(text);
    
        SetPlantaData(json);
        setModalVisible(false);
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
      } else if (value > 80 && value <= 104) {
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

    const getNomeDaImagemSelecionada = () => {
      switch (imagemSelecionada) {
        case 'BATATA':
          return 'Batata';
        case 'TOMATE':
          return 'Tomate';
        case 'REPOLHO':
          return 'Repolho';
        case 'ALFACE':
          return 'Alface';
        default:
          return '';
      }
    };

    const getProgressBarColorNitrogenio = value => {
      const maxNitrogenio = parseFloat(plantaData[0].nitrogenio.replace(',', '.'));
      
      if (isNaN(maxNitrogenio)) {
        console.error('Erro: maxNitrogenio não é um número válido');
        return '#000000';
      }
    
      const numericValue = parseFloat(value.replace(',', '.'));
    
      if (isNaN(numericValue)) {
        console.error('Erro: value não é um número válido');
        return '#000000';
      }
    
      const partSize = maxNitrogenio / 5;
    
      if (numericValue >= 0 && numericValue <= partSize) {
        return '#00ff00'; // Verde claro
      } else if (numericValue > partSize && numericValue <= 2 * partSize) {
        return '#008000'; // Verde escuro
      } else if (numericValue > 2 * partSize && numericValue <= 3 * partSize) {
        return '#ffff00'; // Amarelo
      } else if (numericValue > 3 * partSize && numericValue <= 4 * partSize) {
        return '#ffa500'; // Laranja
      } else if (numericValue > 4 * partSize && numericValue <= maxNitrogenio) {
        return '#ff0000'; // Vermelho
      }
    
      return '#000000'; // Preto (valor inválido)
    }; 
    
    return (
<View style={styles.container}>
<Modal
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalContent}>
      <Text style={styles.tituloModal}>Selecione o que será monitorado</Text>
        <View style={styles.rowModal}>
        <TouchableOpacity
            style={[styles.barContainer2, imagemSelecionada === 'HORTELA' && styles.imagemSelecionada]}
            onPress={() => setImagemSelecionada('HORTELA')}
          >
          <Image
            style={styles.image}
            resizeMode='contain'
            source={require('../../assets/images/HORTELA.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.barContainer, imagemSelecionada === 'TOMATE' && styles.imagemSelecionada]}
            onPress={() => setImagemSelecionada('TOMATE')}>
        <Image
            style={styles.image}
            resizeMode='contain'
            source={require('../../assets/images/TOMATE.png')}/>
        </TouchableOpacity>
        </View>
        <View style={styles.rowModal}>
        <TouchableOpacity
            style={[styles.barContainer2, imagemSelecionada === 'REPOLHO' && styles.imagemSelecionada]}
            onPress={() => setImagemSelecionada('REPOLHO')}
          >
          <Image
            style={styles.image}
            resizeMode='contain'
            source={require('../../assets/images/REPOLHO.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.barContainer, imagemSelecionada === 'ALFACE' && styles.imagemSelecionada]}
            onPress={() => setImagemSelecionada('ALFACE')}>
        <Image
            style={styles.image}
            resizeMode='contain'
            source={require('../../assets/images/ALFACE.png')}/>
        </TouchableOpacity>
        </View>
        <View style={styles.btnIniciar}>
          <Button  style={styles.btnMonit} title="Iniciar Monitoramento" onPress={handleIniciarMonitoramento} />
        </View>
      </View>
    </Modal>
  <Text style={styles.titulo}>Monitoramento</Text>
  {data.length > 0 && plantaData.length>0 ? (
    <>
      <View style={styles.row}>
  <View style={styles.barContainer2}>
    <Text style={styles.texto}>Temperatura</Text>
    <Text style={styles.texto}>Recomendada: {plantaData[0].temperatura}</Text>
    <AnimatedCircularProgress
      size={100}
      width={20}
      fill={getProgressBarFill(data[0].temperatura, 0, 40)}
      tintColor={getProgressBarColorTemperatura(data[0].temperatura)}
      backgroundColor="#3d5875"
    >
      {(fill) => (
        <View>
          <Text style={styles.textoCirculo}> {data[0].temperatura}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  </View>
  <View style={styles.barContainer}>
    <Text style={styles.texto}>pH</Text>
    <Text style={styles.texto}>Recomendada: {plantaData[0].ph}</Text>
    <AnimatedCircularProgress
      size={100}
      width={20}
      fill={getProgressBarFillPH(data[0].ph)}
      tintColor={getProgressBarColorPH(data[0].ph)}
      backgroundColor="#3d5875"
    >
      {(fill) => (
        <View>
          <Text style={styles.textoCirculo}> {data[0].ph}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  </View>
</View>
      <View style={styles.row}>
        <View style={styles.barContainer2}>
          {/* <Text style={styles.texto}>Umidade: {data[0].umidade}</Text> */}
          <Text style={styles.texto}>Umidade</Text>
          <Text style={styles.texto}>Recomendada: {plantaData[0].umidade}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={umidadeNumerica}
            tintColor={getProgressBarColorUmidade(data[0].umidade)}
            backgroundColor="#3d5875"
          >
            {(fill) => (
              <View>
                <Text style={styles.textoCirculo}> {data[0].umidade}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.barContainer}>
          {/* <Text style={styles.texto}>Fósforo: {data[0].fosforo}</Text> */}
          <Text style={styles.texto}>Recomendada: {plantaData[0].fosforo}</Text>
          <Text style={styles.texto}>Fosforo</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].fosforo, 0, 100)}
            tintColor={getProgressBarColor(data[0].fosforo)}
            backgroundColor="#3d5875"
          >
             {(fill) => (
              <View>
                <Text style={styles.textoCirculo}> {data[0].fosforo}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.barContainer2}>
          {/* <Text style={styles.texto}>Nitrogênio: {data[0].nitrogenio}</Text> */}
          <Text style={styles.texto}>Nitrogenio</Text>
          <Text style={styles.texto}>Recomendada: {plantaData[0].nitrogenio}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].nitrogenio, 0, 100)}
            tintColor={getProgressBarColor(data[0].nitrogenio)}
            backgroundColor="#3d5875"
          >
            {(fill) => (
                          <View>
                            <Text style={styles.textoCirculo}> {data[0].nitrogenio}</Text>
                          </View>
                        )}
            </AnimatedCircularProgress>
        </View>
        <View style={styles.barContainer}>
          {/* <Text style={styles.texto}>Potássio: {data[0].potassio}</Text> */}
          <Text style={styles.texto}>Potássio</Text>
          <Text style={styles.texto}>Recomendada: {plantaData[0].potassio}</Text>
          <AnimatedCircularProgress
            size={100}
            width={20}
            fill={getProgressBarFill(data[0].potassio, 0, 100)}
            tintColor={getProgressBarColor(data[0].potassio)}
            backgroundColor="#3d5875"
          >
            {(fill) => (
                          <View>
                            <Text style={styles.textoCirculo}> {data[0].potassio}</Text>
                          </View>
                        )}
            </AnimatedCircularProgress>
        </View>
      </View>
      {console.log(umidadeNumerica, parseFloat(plantaData[0].umidade.replace(',', '.')))}
{/* Verificar se a umidade atual é maior que a recomendada */}
{umidadeNumerica > parseFloat(plantaData[0].umidade.replace(',', '.')) && umidadeAlertVisible && (
    Alert.alert(
      'Alerta',
      'A umidade atual está acima da recomendada!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setUmidadeAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )}

{potassioNumerico > parseFloat(plantaData[0].potassio.replace(',', '.')) && potassioAlertVisible && (
    Alert.alert(
      'Alerta',
      'O Potássio atual está acima do recomendado!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setPotassioAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )}

{fosforoNumerico > parseFloat(plantaData[0].fosforo.replace(',', '.')) && fosforoAlertVisible && (
    Alert.alert(
      'Alerta',
      'O Fósforo atual está acima do recomendado!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setFosforoAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )}

{temperaturaNumerica > parseFloat(plantaData[0].temperatura.replace(',', '.')) && temperaturaAlertVisible && (
    Alert.alert(
      'Alerta',
      'A temperatura atual está acima da recomendada!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setTemperaturaAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )}

{phNumerico > parseFloat(plantaData[0].ph.replace(',', '.')) && phAlertVisible && (
    Alert.alert(
      'Alerta',
      'O PH atual está acima da recomendado!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setPhAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )} 

{nitrogenioNumerica > parseFloat(plantaData[0].nitrogenio.replace(',', '.')) && nitrogenioAlertVisible && (
    Alert.alert(
      'Alerta',
      'O Nitrogenio atual está acima do recomendado!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setNitrogenioAlertVisible(false); // Esconde o alerta após o OK ser pressionado
          },
        },
      ],
      { cancelable: false }
    )
  )}    
    </>
  ) : (
    <Text>Aguardando dados...</Text>
  )}
</View>


);
};