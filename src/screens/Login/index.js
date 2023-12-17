import React, { useState } from 'react';
import { styles } from './styles'
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Senha } from '../../components/Password';
import { SenhaLogin } from '../../components/PasswordLogin';
import { FontAwesome5 } from '@expo/vector-icons';

export function Login({ navigation }) {
  const [modalActive, setModalActive] = useState(false)
  const [modal2Active, setModal2Active] = useState(false)
  const [LoginUser, setLoginUser] = useState('')
  const [SenhaUser, setSenhaUser] = useState('')
  const [Info, setInfo] = useState('')
  const [InfoCadastro, setInfoCadastro] = useState('')
  const [InfoAlterar, setInfoAlterar] = useState('')


  //Novo Usuário
  const [createUser, setCreateUser] = useState('')
  const [createLogin, setCreateLogin] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [createConfirmPassword, setCreateConfirmPassword] = useState('')

  const [newLogin, setNewLogin] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')

  function Leave() {
    navigation.navigate('Home')
  }

  const handlePressVoltar = () => {
    setModalActive(false);
    setInfoCadastro('');
  };

  const handlePressVoltar2 = () => {
    setModal2Active(false);
    setInfoCadastro('');
  }

  const handlePressCriarConta = () => {
    setInfo('');
    setModalActive(true);

  };

  const handlePressAlterarSenha = () => {
    setInfoAlterar('');
    setModal2Active(true);
  }

  async function VerificaLogin() {
    if (LoginUser === '' || SenhaUser === '') {
      setInfo('Por favor, preencha todos os campos!');
    } else {
      try {
        const response = await fetch('https://smartgreen.azurewebsites.net/Usuarios/login', {
          method: 'POST', // Use o método HTTP apropriado (GET, POST, etc.)
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login: LoginUser, senha: SenhaUser }),
        });

        if (response.ok) {
          //console.log(response);
          const data = await response.json();
          if (data === true) {
            setInfo('');
            navigation.navigate('Monitor', { Nome: LoginUser });
          } else {
            setInfo('Usuário e/ou senha incorretos');
          }
        } else {
          setInfo('Usuário e/ou senha incorretos');
        }
      } catch (error) {
        //console.error('Erro:', error);
        setInfo('Ocorreu um erro ao tentar fazer login');
      }
    }
  }

  async function VerificaCadastro() {
    if (createUser === '' || createPassword === '' || createLogin === '') {
      setInfoCadastro('Por favor, preencha todos os campos!');
    } else if (createLogin.length < 4 || createLogin.length === 4) {
      setInfoCadastro('Login deve conter mais de 4 caracteres');
    } else if (createConfirmPassword.length < 8 || createPassword.length < 8 || createConfirmPassword !== createPassword) {
      setInfoCadastro('A senha deve conter mais de 8 caracteres e as senhas devem coincidir');
    } else {
      setInfoCadastro('');
  
      try {
        // Verifica se o login já existe
        const verificaLoginResponse = await fetch(`https://smartgreen.azurewebsites.net/Usuarios/verificaLogin?login=${createLogin}`);
  
        if (verificaLoginResponse.status === 200) {
          // Já existe um usuário com este login
          setInfoCadastro('Já existe um usuário com este login. Escolha outro.');
        } else {
          // Continua com a criação do usuário
          const response = await fetch('https://smartgreen.azurewebsites.net/Usuarios/criaLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: createUser, login: createLogin, senha: createPassword }),
          });
  
          if (response.ok) {
            setModalActive(false);
          } else {
            // Lida com outros erros
            setInfoCadastro('Erro ao criar usuário');
          }
        }
      } catch (error) {
        //console.error('Erro:', error);
        setInfoCadastro('Ocorreu um erro ao tentar criar usuário');
      }
    }
  }
  
  async function VerificaAlteraSenha() {
    try {
      if (newLogin.length <= 0 || newPassword.length <= 0 || newConfirmPassword.length <= 0) {
        setInfoAlterar('Por favor, preencha todos os campos!');
      } else if (!newLogin.length) {
        setInfoAlterar('Para prosseguir é necessário inserir o login!');
      } else if (!newPassword.length) {
        setInfoAlterar('Para prosseguir é necessário inserir a nova senha!');
      } else if (!newConfirmPassword.length) {
        setInfoAlterar('Para prosseguir é necessário confirmar a nova senha!');
      } else if (newPassword !== newConfirmPassword) {
        setInfoAlterar('As novas senhas não coincidem!');
      } else {

        const verificaLoginResponse = await fetch(`https://smartgreen.azurewebsites.net/Usuarios/verificaLogin?login=${newLogin}`);

        if (verificaLoginResponse.status === 200) {

          const verificaAcessoAntigoResponse = await fetch('https://smartgreen.azurewebsites.net/Usuarios/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: newLogin, senha: newPassword }),
          });


          if (verificaAcessoAntigoResponse.status === 400) {
            console.log("chegou aquii");
            const alteraSenhaResponse = await fetch(`https://smartgreen.azurewebsites.net/Usuarios/alteraSenha?login=${newLogin}&senha=${newPassword}`, {
              method: 'PUT',
              headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
              },
            });

            if (alteraSenhaResponse.status === 200) {

              setModal2Active(false);

            } else {

              setInfoAlterar('Erro ao alterar a senha. Por favor, tente novamente.');
            }
          } else {

            setInfoAlterar('A senha inserida é a atual.');
          }
        } else {

          setInfoAlterar('O login não existe.');
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      setInfoAlterar('Ocorreu um erro ao tentar alterar a senha.');
      //onsole.log(JSON.stringify(error));
    }
  }


  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.Info}>
        {Info}
      </Text>
      <KeyboardAvoidingView behavior='position' style={styles.inputContainer}>
        <Input
          hasIcon
          placeholder='Login'
          name='user-alt'
          onChangeText={x => setLoginUser(x)}
        />
        <SenhaLogin
          hasIcon
          placeholder='Senha'
          name='key'
          onChangeText={x => setSenhaUser(x)}
        />
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>

        <TouchableHighlight
          onPress={handlePressAlterarSenha}
        >
          <View>
            <Text style={styles.fontEsqueci}>Esqueci minha senha</Text>
          </View>
        </TouchableHighlight>
        <Button
          title='Entrar'
          onPress={VerificaLogin}
        />
        <Button
          title='Cadastre-se '
          onPress={handlePressCriarConta}
        />
      </View>
      <Modal
        onRequestClose={() => setModalActive(false)}
        animationType="fade"
        visible={modalActive}
      >
        <KeyboardAvoidingView style={styles.modalView}>
          <Text style={styles.title}>
            Crie sua conta
          </Text>
          <View style={styles.separator} />
          <Input
            hasIcon='false'
            placeholder='Nome'
            onChangeText={x => setCreateUser(x)}
          />
          <Input
            hasIcon='false'
            placeholder='Login'
            onChangeText={x => setCreateLogin(x)}
          />
          <Senha
            hasIcon='false'
            placeholder='Senha'
            onChangeText={x => setCreatePassword(x)}
          //secureTextEntry={true} 
          />
          <Senha
            hasIcon='false'
            placeholder='Confirmar Senha'
            onChangeText={x => setCreateConfirmPassword(x)}
          //secureTextEntry={true} 
          />
          <Text style={styles.Info}>
            {InfoCadastro}
          </Text>
          <View style={styles.buttonContainerModal}>
            <Button
              title='Confirmar'
              onPress={VerificaCadastro}
            />
            <Button onPress={handlePressVoltar} title="Voltar" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        onRequestClose={() => setModal2Active(false)}
        animationType='fade'
        visible={modal2Active}
      >
        <KeyboardAvoidingView style={styles.modalView}>
          <Text style={styles.title}>Trocar a Senha</Text>
          <View style={styles.separator} />
          <View>
            <Input
              placeholder="Digite seu Login"
              onChangeText={x => setNewLogin(x)}>
            </Input>
            <SenhaLogin
              placeholder="Digite sua Nova Senha"
              onChangeText={x => setNewPassword(x)}>
            </SenhaLogin>
            <SenhaLogin
              placeholder="Confirme a Nova Senha"
              onChangeText={x => setNewConfirmPassword(x)}>
            </SenhaLogin>
            <Text style={styles.Info}>
              {InfoAlterar}
            </Text>
          </View>
          <View style={styles.buttonContainerModal}>
            <Button
              title='Confirmar'
              onPress={VerificaAlteraSenha}
            />
            <Button onPress={handlePressVoltar2} title="Voltar" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}