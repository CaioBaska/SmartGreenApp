import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Alert, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button } from '../../components/Button';
import { Table, Row, Rows } from 'react-native-table-component';
import { Input } from '../../components/Input';

export function Monitor({ navigation }) {

  const [data, setData] = useState([]);
  const [plantaData, SetPlantaData] = useState([]);

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

  const luminosidadeString = data.length > 0 ? data[0].luminosidade.replace(',', '.') : '0';
  const luminosidadeNumerica = parseFloat(luminosidadeString);
  const [luminosidadeAlertVisible, setLuminosidadeAlertVisible] = useState(true);

  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(true);
  const [modalDigitaRelatorio, setModalDigitaRelatorio] = useState(false);
  const [modalGeraRelatorio, setModalGeraRelatorio] = useState(false);
  const [modalCriaPlanta, setModalCriaPlanta] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [nomePlantaSelecionada, setNomePlantaSelecionada] = useState('');
  const [mensagemMQTT, setMensagemMQTT] = React.useState("liga");

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [formattedDate, SetFormattedDate] = useState('');
  const [date, setDate] = useState('');

  const [tableData, setTableData] = useState([]);

  const [relatorioData, setRelatorioData] = useState([]);

  const [InfoCadastroPlanta, setInfoCadastroPlanta] = useState('')

  const [temperaturaEditada, setTemperaturaEditada] = useState('')
  const [umidadeEditada, setUmidadeEditada] = useState('')
  const [nitrogenioEditada, setNitrogenioEditada] = useState('')
  const [fosforoEditada, setFosforoEditada] = useState('')
  const [phEditada, setPhEditada] = useState('')
  const [potassioEditada, setPotassioEditada] = useState('')
  const [luminosidadeEditada, setLuminosidadeEditada] = useState('')

  const [intervalId, setIntervalId] = React.useState(null);

  const [habilitaEnvioMQTT, setHabilitaEnvioMQTT] = useState(false);





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
      // setLuminosidadeAlertVisible(true);
    }, 300000); // 60000 milissegundos = 1 minuto

    return () => clearTimeout(alertTimeout);
  }, [fosforoAlertVisible]);

  const handleMQTTButtonPress = async () => {
    try {
      setMensagemMQTT("liga")
      const response = await fetch(`https://smartgreen.azurewebsites.net/Monitoramento/mandarTopicoMqtt?mensagem=${mensagemMQTT}`, {
        method: 'GET',
      });
      console.log("Mensagem MQTT Enviada Ligar")
    }
    catch {
      // console.log(mensagemMQTT)

    }
  };

  const handleMQTTButtonDesligaPress = async () => {
    try {
      setMensagemMQTT("desliga")
      const response = await fetch(`https://smartgreen.azurewebsites.net/Monitoramento/mandarTopicoMqtt?mensagem=${mensagemMQTT}`, {
        method: 'GET',
      });
      console.log("Mensagem MQTT Enviada Desligar")
    }
    catch {
      // console.log(mensagemMQTT)

    }
  };

  useEffect(() => {
    const checkUmidade = () => {
      if (!modalVisible && !modalCriaPlanta && !modalDigitaRelatorio && data.length > 0 && data[0].umidade < plantaData[0].umidade) {
        handleMQTTButtonPress();
      }
      if(!modalVisible && !modalCriaPlanta && !modalDigitaRelatorio && data.length > 0 && data[0].umidade > plantaData[0].umidade){
        handleMQTTButtonDesligaPress();
      }

    };

    // Inicie a verificação a cada segundo apenas se modalVisible e modalCriaPlanta forem false
    if (!modalVisible && !modalCriaPlanta) {
      const id = setInterval(checkUmidade, 2000);
      setIntervalId(id);

      // Limpe o intervalo quando o componente for desmontado ou quando modalVisible/modalCriaPlanta mudar para true
      return () => clearInterval(id);
    }
  }, [data, plantaData, modalVisible, modalCriaPlanta]);

  const abreRelatorio = () => {
    setModalDigitaRelatorio(true);
    setDataInicial('');
    setDataFinal('');
  }

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
      setHabilitaEnvioMQTT(true);
      setModalVisible(false);

    } catch (error) {
      console.error(error);
    }
  };

  const BotaoAbreTelaEditar = () => {
    setModalCriaPlanta(true);
  }

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


  // Exemplo de dados, você deve substituir isso pelos dados reais da sua API
  const dadosExemplo = [
    ['01/01/2023 10:00:00', '25', '60', '7.0', '10', '20', '30', '100'],
    // ... Outras linhas de dados
  ];

  useEffect(() => {
    // Aqui você pode fazer a chamada à API e atualizar o state com os dados reais
    setTableData(dadosExemplo);
  }, []);


  const handleGeraRelatorio = async () => {
    try {

      if (!dataInicial || !dataFinal || dataInicial.length !== 19 || dataFinal.length !== 19) {
        console.error("Por favor, forneça datas válidas no formato DD/MM/AAAA HH:mm:ss");
        return;
      }

      // Construa a URL com as datas formatadas
      const url = `https://smartgreen.azurewebsites.net/Monitoramento/obterDadosByData?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;

      // Faça a requisição com a URL construída
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
      }

      const jsonData = await response.json();

      // Transforme os dados para o formato desejado
      const formattedData = jsonData.map(item => {
        const valuesArray = Object.values(item);
        return valuesArray.map(value => {
          if (typeof value === 'string') {
            // Se for uma string e contiver ',', converta para número
            return value.includes(',') ? parseFloat(value.replace(',', '.')) : value;
          }
          return value;
        });
      });

      // Atualize o estado com os dados formatados do relatório
      setRelatorioData(formattedData);

      // Abra o modal do relatório
      setModalGeraRelatorio(true);

    } catch (error) {
      console.error(error);
    }
  };

const handleFechaRelatorio = ()=>{
    setModalGeraRelatorio(false);
    setModalDigitaRelatorio(false);
}

  const fecharModaisRelatorio = () => {
    setModalGeraRelatorio(false);
    setModalDigitaRelatorio(false);
  };

  const BotaoVoltaTelalogin = () => {
    navigation.navigate('Home')
  }

  const botaoIniciaMonitoramentoEditado = async () => {
    setInfoCadastroPlanta('');
    // Função de validação para números inteiros ou decimais
    const isNumeric = (value) => {
      // A expressão regular permite números inteiros ou decimais no formato "3.4"
      return /^[0-9]+([,.][0-9]+)?$/.test(value);
    };

    // Verifique se algum dos campos está vazio ou não é numérico
    if (
      !isNumeric(temperaturaEditada) ||
      !isNumeric(umidadeEditada) ||
      !isNumeric(nitrogenioEditada) ||
      !isNumeric(fosforoEditada) ||
      !isNumeric(phEditada) ||
      !isNumeric(potassioEditada)
      // !isNumeric(luminosidadeEditada)
    ) {
      // Preencha a mensagem de erro
      setInfoCadastroPlanta("Por favor, preencha todos os campos com valores numéricos antes de iniciar o monitoramento.");
      return; // Encerre a execução aqui para não continuar com a lógica principal
    }

    try {
      // Construa a URL com os parâmetros
      const url = `https://smartgreen.azurewebsites.net/Plantas/cadastrarPlanta?nomePlanta=EDIT&temperatura=${temperaturaEditada}&umidade=${umidadeEditada}&nitrogenio=${nitrogenioEditada}&fosforo=${fosforoEditada}&PH=${phEditada}&potassio=${potassioEditada}&luminosidade=0`;

      // Realize a chamada à API
      const response = await fetch(url, {
        method: 'GET', // ou 'GET', dependendo do método suportado pelo endpoint
      });

      if (response.ok) {

        const url = "https://smartgreen.azurewebsites.net/Plantas/obterDadosPlantas?nomePlanta=EDIT"

        const response = await fetch(url, {
          method: 'GET', // ou 'GET', dependendo do método suportado pelo endpoint
        });

        if (response.ok) {

          const text = await response.text();

          if (!text) {
            throw new Error('Resposta vazia ou não no formato JSON esperado.');
          }

          const json = JSON.parse(text);

          SetPlantaData(json);
          setHabilitaEnvioMQTT(true);
          setModalCriaPlanta(false);
          setModalVisible(false);


        }

        else {
          throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
        }

        setInfoCadastroPlanta("Monitoramento iniciado com sucesso!");

      } else {
        throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
      }


      // Restante da lógica, se necessário

      // Se tudo estiver correto, você pode redefinir a mensagem de erro para vazia ou uma mensagem de sucesso
    } catch (error) {
      console.error(error);
      // Em caso de erro na chamada da API, trate conforme necessário
      setInfoCadastroPlanta("Erro ao iniciar o monitoramento. Por favor, tente novamente.");
    }

    // Se tudo estiver correto, você pode redefinir a mensagem de erro para vazia ou uma mensagem de sucesso
    setInfoCadastroPlanta("Monitoramento iniciado com sucesso!");
  };

  const botaoFechaMonitoramentoEditado = async () => {

    setModalCriaPlanta(false);
    setRelatorioData([]);
  };

  const handleVoltaSelecionarPlanta = ()=>{
    setModalVisible(true);
  }

  const widthArr = [100, 38, 38, 38, 38, 38, 38, 38];

  return (
    <View style={styles.container}>
      {/*MODAL SELECIONAR PLANTA*/}
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
                source={require('../../assets/images/TOMATE.png')} />
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
                source={require('../../assets/images/ALFACE.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnEditarPlanta}>
            <TouchableOpacity onPress={BotaoAbreTelaEditar} >
              <FontAwesome5 name="edit" size={50} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.btnIniciar}>
            <Button
              title="Iniciar Monitoramento"
              onPress={handleIniciarMonitoramento}
            />
          </View>
        </View>
      </Modal>
      {/*MODAL DIGITA RELATORIO*/}
      <Modal
        visible={modalDigitaRelatorio}
        transparent={false}
      >
        <View>

          <Text style={styles.tituloRelatorio}>Gerar Relatório</Text>


          <Text style={styles.texto}>Data Inicial</Text>
          <TextInputMask
            style={styles.txtInpuMask}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY HH:mm:ss',
            }}
            placeholder="Digite a Data Inicial (DD/MM/YYYY HH:mm:ss)"
            value={date}
            onChangeText={x => setDataInicial(x)}
            keyboardType="numeric"
          />

          <Text style={styles.texto}>Data Inicial</Text>
          <TextInputMask
            style={styles.txtInpuMask}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY HH:mm:ss',
            }}
            placeholder="Digite a Data Final (DD/MM/YYYY HH:mm:ss)"
            value={date}
            onChangeText={x => setDataFinal(x)}
            keyboardType="numeric"
          />

          {/* Botão para gerar relatório */}
          <View style={styles.botoesRelatorio}>
            <View style={styles.btnIniciar}>
              <Button title="Gerar Relatório" onPress={handleGeraRelatorio} />
            </View>
            <View style={styles.btnIniciar}>
              <Button title="Voltar" onPress={handleFechaRelatorio}></Button>
            </View>
          </View>
        </View>
      </Modal>
      {/*MODAL GERA RELATORIO*/}
      <Modal
        visible={modalGeraRelatorio}
        transparent={false}
      >

        <View style={styles.container}>
          <View style={styles.btnRetornaMonitoramento}>
            <TouchableOpacity onPress={fecharModaisRelatorio}>
              <FontAwesome5 name='home' size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={['Data', 'T', 'U', 'P', 'PH', 'N', 'F', 'L']} style={styles.head} widthArr={widthArr} />
              <Rows data={relatorioData} widthArr={widthArr} />
            </Table>
          </ScrollView>
        </View>
      </Modal>
      {/*MODAL EDITA PLANTA */}
      <Modal
        visible={modalCriaPlanta}
        transparent={false}
      >
        <View style={styles.container}>
          <View><Text style={styles.txtEditarPlanta}>Criar Monitoramento Personalizado</Text></View>

          <Input placeholder='Digite a Temperatura' onChangeText={x => setTemperaturaEditada(x)} />
          <Input placeholder='Digite a Umidade mínima' onChangeText={x => setUmidadeEditada(x)} />
          <Input placeholder='Digite o Nitrogenio' onChangeText={x => setNitrogenioEditada(x)} />
          <Input placeholder='Digite o Fosforo' onChangeText={x => setFosforoEditada(x)} />
          <Input placeholder='Digite o PH' onChangeText={x => setPhEditada(x)} />
          <Input placeholder='Digite o Potassio' onChangeText={x => setPotassioEditada(x)} />
          {/* <Input placeholder='Digite a Luminosidade' onChangeText={x => setLuminosidadeEditada(x)} /> */}
          <Text style={styles.Info}>
            {InfoCadastroPlanta}
          </Text>
          <View style={styles.btnCriarPlanta}>
            <Button
              title='Iniciar'
              onPress={botaoIniciaMonitoramentoEditado}
            ></Button>
            <Button
              title='Voltar'
              onPress={botaoFechaMonitoramentoEditado}
            ></Button>
          </View>

        </View>
      </Modal>

      <Text style={styles.titulo}></Text>
      {data.length > 0 && plantaData.length > 0 ? (
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
              <Text style={styles.texto}>Fosforo</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].fosforo}</Text>
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
          <View >
            <View style={styles.barContainerCentro}>
              {/* <Text style={styles.texto}>Nitrogênio: {data[0].nitrogenio}</Text> */}
              <Text style={styles.texto}>Luminosidade</Text>
              {/* <Text style={styles.texto}>Recomendada: {plantaData[0].luminosidade}</Text> */}
              <AnimatedCircularProgress
                size={100}
                width={20}
                fill={getProgressBarFill(data[0].luminosidade, 0, 100)}
                tintColor={getProgressBarColor(data[0].luminosidade)}
                backgroundColor="#3d5875"
              >
                {(fill) => (
                  <View>
                    <Text style={styles.textoCirculo}> {data[0].luminosidade}</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <View style={styles.botoesMonitoramento}>
            <TouchableOpacity onPress={handleVoltaSelecionarPlanta}  >
              <FontAwesome5 name="seedling" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMQTTButtonPress}  >
              <FontAwesome5 name="tint" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={BotaoVoltaTelalogin} >
              <FontAwesome5 name="home" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={abreRelatorio} >
              <FontAwesome5 name="calendar-alt" size={50} color="black" />
            </TouchableOpacity>
          </View>
          {/* {console.log(umidadeNumerica, parseFloat(plantaData[0].umidade.replace(',', '.')))} */}
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

          {/* {luminosidadeNumerica > parseFloat(plantaData[0].luminosidade.replace(',', '.')) && luminosidadeAlertVisible && (
            Alert.alert(
              'Alerta',
              'A luminosidade atual está acima da recomendada!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('OK Pressed');
                    setLuminosidadeAlertVisible(false); // Esconde o alerta após o OK ser pressionado
                  },
                },
              ],
              { cancelable: false }
            )
          )} */}

        </>
      ) : (
        <Text>Aguardando dados...</Text>
      )}
    </View>


  );
};