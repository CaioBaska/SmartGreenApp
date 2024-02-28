import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Alert, ScrollView, Dimensions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button } from '../../components/Button';
import { Table, Row, Rows } from 'react-native-table-component';
import { Input } from '../../components/Input';
import RNPickerSelect from 'react-native-picker-select';
import Blink from '../../components/Blink'
import BlinkPH from '../../components/BlinkPH';
import { ImageBackground } from 'react-native-web';


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
  const [modalEnviaRelatorio, setModalEnviaRelatorio] = useState(false);
  const [modalCriaPlanta, setModalCriaPlanta] = useState(false);
  const [ModalGrafico, setModalGrafico] = useState(false);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [edicaoSelecionada, setEdicaoSelecionada] = useState('');
  const [infoSelecionadas, SetInfoSelecionadas] = useState('');

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
  const [nomeEditado, setNomeEditado] = useState('')

  const [intervalId, setIntervalId] = React.useState(null);

  const [habilitaEnvioMQTT, setHabilitaEnvioMQTT] = useState(false);

  const [destinatarioEmail, setDestinatarioEmail] = useState('')
  const [infoEnvioEmail, setInfoEnvioEmail] = useState('')

  const [plantasModificadas, setPlantasModificadas] = useState('aaaa')
  const plantasItems = Array.isArray(plantasModificadas)
    ? plantasModificadas.map(planta => ({ label: planta, value: planta }))
    : [];

  const placeholder = {
    label: 'Selecione uma opção Personalizada',
    value: null,
    color: '#9EA0A4',
  };

  useEffect(() => {
    //console.log('erro busca dados');
    buscaDados();
    const interval = setInterval(buscaDados, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (modalVisible == true) {
      //console.log('effect carregado')
      buscaDadosPlantas();
      const interval = setInterval(buscaDadosPlantas, 1000);
      return () => clearInterval(interval);
    }
  }, [modalVisible]);

  //ATIVAR NOVAMENTE
  useEffect(() => {
    if (!modalVisible && !modalCriaPlanta && !modalDigitaRelatorio && !modalGeraRelatorio && !modalEnviaRelatorio && !fosforoAlertVisible) {
      const alertTimeout = setTimeout(() => {
        setFosforoAlertVisible(true);
        setNitrogenioAlertVisible(true);
        setPhAlertVisible(true);
        setUmidadeAlertVisible(true);
        setTemperaturaAlertVisible(true);
        setPotassioAlertVisible(true);
        setLuminosidadeAlertVisible(true);
      }, 10000); // 60000 milissegundos = 1 minuto

      return () => clearTimeout(alertTimeout);
    }
  }, [modalVisible, modalCriaPlanta, modalDigitaRelatorio, modalGeraRelatorio, modalEnviaRelatorio, fosforoAlertVisible]);


  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setUmidadeAlertVisible(true);
      // setLuminosidadeAlertVisible(true);
    }, 30000); // 60000 milissegundos = 1 minuto

    return () => clearTimeout(alertTimeout);

  })


  const handleMQTTButtonPress = async () => {
    try {
      setMensagemMQTT("liga")
      const response = await fetch(`https://smartgreen.azurewebsites.net/Monitoramento/mandarTopicoMqtt?mensagem=${mensagemMQTT}`, {
        method: 'GET',
      });
      console.log("Mensagem MQTT Enviada Ligar")
      //console.log(fosforoNumerico)
      //console.log(plantaData[0].fosforo)
      //console.log(fosforoAlertVisible)
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
      if (!modalVisible && !modalCriaPlanta && !modalDigitaRelatorio && data.length > 0 && data[0].umidade > plantaData[0].umidade) {
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

      if (!response.ok) {
        throw new Error(`Erro ao buscar os valores Monitorados`);
      }
      else {
        const json = await response.json();
        setData(json);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const buscaDadosPlantas = async () => {
    try {
      const response = await fetch('https://smartgreen.azurewebsites.net/Plantas/obterTodasPlantasPersonalizadas');

      if (!response.ok) {
        throw new Error(`Não foi possível buscar os dados Personalizados`);
      }
      else {
        const json = await response.json();
        setPlantasModificadas(json);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleIniciarMonitoramento = async () => {
    try {
      //console.log(imagemSelecionada);
      //console.log(edicaoSelecionada);
      if (imagemSelecionada !== null && edicaoSelecionada !== null) {
        // Ambos foram selecionados, emita um aviso ou tome a ação apropriada
        SetInfoSelecionadas('Selecione apenas uma opção: imagem ou valor do Editado.');
        return;
      }
      if (imagemSelecionada == null && edicaoSelecionada == null) {

        SetInfoSelecionadas('Selecione uma opção para iniciar o monitoramento');
        return;

      }
      if (imagemSelecionada !== null) {

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
        SetInfoSelecionadas('');

      }
      else {
        const response = await fetch(`https://smartgreen.azurewebsites.net/Plantas/obterDadosPlantas?nomePlanta=${edicaoSelecionada}`, {
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
        SetInfoSelecionadas('');
      }


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
      //console.log(graficoData)
      // Abra o modal do relatório

      setModalGeraRelatorio(true);

    } catch (error) {
      console.error(error);
    }
  };

  const handleFechaRelatorio = () => {
    setModalGeraRelatorio(false);
    setModalDigitaRelatorio(false);
  }

  const handleAbreEnviarRelatorio = () => {
    setModalEnviaRelatorio(true);
    setModalGeraRelatorio(false);
    setDestinatarioEmail('');
  }

  const handleEnviarRelatorioEmail = async () => {
    setModalEnviaRelatorio(true);
    setModalGeraRelatorio(false);
    try {
      if (!dataInicial || !dataFinal || dataInicial.length !== 19 || dataFinal.length !== 19) {
        setInfoEnvioEmail("Por favor, forneça datas válidas no formato DD/MM/AAAA HH:mm:ss");
        return;
      }

      if (destinatarioEmail.length <= 0) {
        setInfoEnvioEmail("Por favor, forneça um email antes de enviar");
        return;
      }

      const mensagem = `${dataInicial},${dataFinal},${destinatarioEmail}`;
      // const url = `https://smartgreen.azurewebsites.net/Monitoramento/mandarRelatorioMqtt?dataInicial=${dataInicial}&dataFinal=${dataFinal}&destinatario=${destinatarioEmail}`;

      const url = `https://smartgreen.azurewebsites.net/Monitoramento/mandarRelatorioMqtt?mensagem=${mensagem}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
      } else {
        setModalEnviaRelatorio(false)
        setModalGeraRelatorio(false)
        setModalDigitaRelatorio(false)
      }

    }
    catch {
      throw new Error(`Erro na solicitação`)
    }

  }

  const fecharModaisRelatorio = () => {
    setModalGeraRelatorio(false);
    setModalDigitaRelatorio(false);
    setModalEnviaRelatorio(false);
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
      setInfoCadastroPlanta("Por favor, preencha todos os campos com valores numéricos antes de editar o monitoramento.");
      return; // Encerre a execução aqui para não continuar com a lógica principal
    }

    if (nomeEditado.length <= 0) {
      setInfoCadastroPlanta("Para prosseguir é necessário colocar um nome");
      return;
    }

    if (nomeEditado == 'TOMATE' && nomeEditado == 'REPOLHO' &&
      nomeEditado == 'BATATA' && nomeEditado == 'HORTELA') {
      setInfoCadastroPlanta("Não é possível editar os Valores Padrões");
      return;
    }

    try {

      const url = `https://smartgreen.azurewebsites.net/Plantas/cadastrarPlanta?nomePlanta=${nomeEditado}&temperatura=${temperaturaEditada}&umidade=${umidadeEditada}&nitrogenio=${nitrogenioEditada}&fosforo=${fosforoEditada}&PH=${phEditada}&potassio=${potassioEditada}&luminosidade=0`;

      const response = await fetch(url, {
        method: 'GET',
      });


      if (response.ok) {

        //DESATIVADO PARA CRIAR E VOLTAR PARA TELA DE EDITAR PLANTA
        setModalCriaPlanta(false);

        const url = "https://smartgreen.azurewebsites.net/Plantas/obterDadosPlantas?nomePlanta=EDIT"

        const response = await fetch(url, {
          method: 'GET', // ou 'GET', dependendo do método suportado pelo endpoint
        });

        // if (response.ok) {

        //   const text = await response.text();

        //   if (!text) {
        //     throw new Error('Resposta vazia ou não no formato JSON esperado.');
        //   }

        //   const json = JSON.parse(text);

        //   SetPlantaData(json);
        //   setHabilitaEnvioMQTT(true);
        //   setModalCriaPlanta(false);
        //   setModalVisible(false);


        // }

        // else {
        //   throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
        // }

        setInfoCadastroPlanta("Monitoramento iniciado com sucesso!");

      }


      else {
        throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
      }

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

  const handleVoltaSelecionarPlanta = () => {
    setModalVisible(true);
  }

  const botaoExcluiMonitoramentoEditado = async () => {
    setInfoCadastroPlanta('')
    //console.log(nomeEditado)
    if (nomeEditado !== 'TOMATE' && nomeEditado !== 'REPOLHO' &&
      nomeEditado !== 'BATATA' && nomeEditado !== 'HORTELA') {

      if (nomeEditado !== '') {

        const url = `https://smartgreen.azurewebsites.net/Plantas/obterDadosPlantas?nomePlanta=${nomeEditado}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {

          const url = `https://smartgreen.azurewebsites.net/Plantas/deletarDadosPlantasPorNome?nomePlanta=${nomeEditado}`;

          const response = await fetch(url);

          setModalCriaPlanta(false)

        }
        else {

          setInfoCadastroPlanta('Não existe nenhum monitoramento com esse nome')
        }



      }
      else {
        setInfoCadastroPlanta('Favor preencher o nome do Monitoramento a ser Excluído')
      }

    } else {
      setInfoCadastroPlanta('Não é possível deletar os valores padrões')
    }

  }

  const TamanhoRelatorio = [100, 38, 38, 38, 38, 38, 38, 38];

  const tituloRelatorio = ['Data', 'T', 'U', 'P', 'PH', 'N', 'F', 'L']

  const borderRelatorio = { borderWidth: 2, borderColor: '#c8e1ff' }

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
              onPress={() => setImagemSelecionada(prevState => prevState === 'HORTELA' ? null : 'HORTELA')}
            >
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/HORTELA.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.barContainer, imagemSelecionada === 'TOMATE' && styles.imagemSelecionada]}
              onPress={() => setImagemSelecionada(prevState => prevState === 'TOMATE' ? null : 'TOMATE')}>
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/TOMATE.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowModal}>
            <TouchableOpacity
              style={[styles.barContainer2, imagemSelecionada === 'REPOLHO' && styles.imagemSelecionada]}
              onPress={() => setImagemSelecionada(prevState => prevState === 'REPOLHO' ? null : 'REPOLHO')}
            >
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/REPOLHO.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.barContainer, imagemSelecionada === 'BATATA' && styles.imagemSelecionada]}
              onPress={() => setImagemSelecionada(prevState => prevState === 'BATATA' ? null : 'BATATA')}>
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/BATATA.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.monitorPicker}>
            <RNPickerSelect
              style={styles.pickerStyle}
              onValueChange={(x) => setEdicaoSelecionada(x)}
              placeholder={placeholder}
              items={plantasItems}
            />
          </View>
          <View style={styles.infoSelecionadasStyle}>
            <Text style={styles.Info}>
              {infoSelecionadas}
            </Text>
          </View>
          <View style={styles.editMenuButtons}>
            <View>
              <Button
                title="Iniciar Monitoramento"
                onPress={handleIniciarMonitoramento}
                color='#27b300'

              />
            </View>
            <View>
              <Button
                title="Editar Monitoramento"
                onPress={BotaoAbreTelaEditar}
                color='#27b300'
              >
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      {/*MODAL DIGITA RELATORIO*/}
      <Modal
        visible={modalDigitaRelatorio}
        transparent={false}
      >
        <View>

          <View style={styles.center}>
            <Text style={styles.tituloRelatorio}>Gerar Relatório</Text>
          </View>

          <View style={styles.GeraRelatorioinput}>
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

            <Text style={styles.texto}>Data Final</Text>
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
          </View>

          <View style={styles.botoesGeraRelatorio}>
            <View>
              <Button title="Gerar Relatório"
                onPress={handleGeraRelatorio}
                color='#27b300'
              />
            </View>
            <View>
              <Button title="Voltar"
                onPress={handleFechaRelatorio}
                color='#27b300'
              />
            </View>
          </View>
        </View>
      </Modal>
      {/*MODAL DO RELATORIO*/}
      <Modal
        visible={modalGeraRelatorio}
        transparent={false}
      >

        <View style={styles.container}>
          <View style={styles.btnRetornaMonitoramento}>
            <TouchableOpacity onPress={fecharModaisRelatorio}>
              <FontAwesome5 name='home' size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAbreEnviarRelatorio}>
              <FontAwesome5 name='file-import' size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Table borderStyle={borderRelatorio}>
              <Row data={tituloRelatorio} widthArr={TamanhoRelatorio} />
              <Rows data={relatorioData} widthArr={TamanhoRelatorio} />
            </Table>
          </ScrollView>
        </View>
      </Modal>
      {/*MODAL ENVIA EMAIL RELATORIO*/}
      <Modal
        visible={modalEnviaRelatorio}
      >
        <View>
          <View>
            <Text style={styles.tituloRelatorioEmail}> Enviar Email com Relatório</Text>
          </View>

          <View>
            <Input
              placeholder='Digite o Email para o envio do relatório'
              onChangeText={x => setDestinatarioEmail(x)}
            >
            </Input>
            <Text style={styles.Info}>
              {infoEnvioEmail}
            </Text>
          </View>
          <View style={styles.botoesEnviarEmail}>
            <View>
              <Button
                title='Enviar'
                onPress={handleEnviarRelatorioEmail}
                color='#27b300'
              />
            </View>
            <View>
              <Button
                title='Voltar'
                onPress={fecharModaisRelatorio}
                color='#27b300'
              />
            </View>
          </View>
        </View>
      </Modal>
      {/*MODAL EDITA PLANTA */}
      <Modal
        visible={modalCriaPlanta}
        transparent={false}
      >
        <View style={styles.container}>
          <View><Text style={styles.txtEditarPlanta}>Editar Monitoramento Personalizado</Text></View>

          <Input placeholder='Digite o Nome Personalizado' onChangeText={x => setNomeEditado(x)} />
          <Input placeholder='Digite a Temperatura' onChangeText={x => setTemperaturaEditada(x)} />
          <Input placeholder='Digite a Umidade mínima' onChangeText={x => setUmidadeEditada(x)} />
          <Input placeholder='Digite o Nitrogenio' onChangeText={x => setNitrogenioEditada(x)} />
          <Input placeholder='Digite o Fosforo' onChangeText={x => setFosforoEditada(x)} />
          <Input placeholder='Digite o PH' onChangeText={x => setPhEditada(x)} />
          <Input placeholder='Digite o Potassio' onChangeText={x => setPotassioEditada(x)} />
          {/* <Input placeholder='Digite a Luminosidade' onChangeText={x => setLuminosidadeEditada(x)} /> */}
          <View style={styles.infoCadastroPlantaStyle}>
            <Text style={styles.Info}>
              {InfoCadastroPlanta}
            </Text>
          </View>
          <View style={styles.btnCriarPlanta}>
            <Button
              title='Iniciar'
              color='#27b300'
              onPress={botaoIniciaMonitoramentoEditado}
            ></Button>
            <Button
              title='Voltar'
              color='#27b300'
              onPress={botaoFechaMonitoramentoEditado}
            />
            <Button
              color='#dc2626'
              title='Excluir'
              onPress={botaoExcluiMonitoramentoEditado}
            ></Button>
          </View>

        </View>
      </Modal>
      {/*MONITORAMENTO PRINCIPAL*/}
      <Text style={styles.titulo}></Text>
      {data.length > 0 && plantaData.length > 0 ? (
        <>
          <View style={styles.row}>
            <View style={styles.barContainer2}>
              <Text style={styles.texto}>Temperatura</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].temperatura}</Text>
              <Blink duration={500} value1={data[0].temperatura} value2={plantaData[0].temperatura} >
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
              </Blink>
            </View>
            <View style={styles.barContainer}>
              <Text style={styles.texto}>pH</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].ph}</Text>
              <BlinkPH duration={500} value1={data[0].ph} value2={plantaData[0].ph} >
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
              </BlinkPH>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.barContainer2}>
              <Text style={styles.texto}>Umidade</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].umidade}</Text>
              <Blink duration={500} value1={data[0].umidade} value2={plantaData[0].umidade} >
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
              </Blink>
            </View>
            <View style={styles.barContainer}>
              {/* <Text style={styles.texto}>Fósforo: {data[0].fosforo}</Text> */}
              <Text style={styles.texto}>Fosforo</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].fosforo}</Text>
              <Blink duration={500} value1={data[0].fosforo} value2={plantaData[0].fosforo} >
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
              </Blink>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.barContainer2}>
              {/* <Text style={styles.texto}>Nitrogênio: {data[0].nitrogenio}</Text> */}
              <Text style={styles.texto}>Nitrogenio</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].nitrogenio}</Text>
              <Blink duration={500} value1={data[0].nitrogenio} value2={plantaData[0].nitrogenio} >
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
              </Blink>
            </View>
            <View style={styles.barContainer}>
              {/* <Text style={styles.texto}>Potássio: {data[0].potassio}</Text> */}
              <Text style={styles.texto}>Potássio</Text>
              <Text style={styles.texto}>Recomendada: {plantaData[0].potassio}</Text>
              <Blink duration={500} value1={data[0].potassio} value2={plantaData[0].potassio} >
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
              </Blink>
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




        </>
      ) : (
        <Text>Aguardando dados...</Text>
      )}
    </View>


  );
};