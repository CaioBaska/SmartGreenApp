import React, {useState} from 'react';
import {styles} from './styles'
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
import { FontAwesome5 } from '@expo/vector-icons';

export function Login({navigation}){
    const [modalActive, setModalActive] = useState(false)
    const [LoginUser, setLoginUser] = useState('')
    const [SenhaUser, setSenhaUser] = useState('')
    const [Info, setInfo] = useState('')
    const [InfoCadastro, setInfoCadastro] = useState('')

    //let Lista = [["admin", "123"]]

    //Novo Usuário
    const [newUser, setNewUser] = useState('')
    const [newLogin, setNewLogin] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function Leave() {
        navigation.navigate('Home')
    }

    const handlePressVoltar = () => {
      setModalActive(false);
      setInfoCadastro('');
    };  

    const handlePressCriarConta = () => {
      setInfo('');
      setLoginUser('');
      setSenhaUser('');
      setModalActive(true);

    };

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
            } else{
                setInfo('Usuário e/ou senha incorretos');
            }
          } catch (error) {
            //console.error('Erro:', error);
            setInfo('Ocorreu um erro ao tentar fazer login');
          }
        }
      }
      

async function VerificaCadastro() {
  
  if(newUser=='' &&newPassword==''&&newLogin==''){
    setInfoCadastro('Por favor, preencha todos os campos!');
  }
   else if (newLogin.length<4 && newLogin.length<4 || newLogin.length==4 && newLogin.length==4 ){
     setInfoCadastro('Login deve conter mais de 4 caracteres');
   }
  else if(confirmPassword.length<8 && newPassword.length<8 || confirmPassword.length==8 && newPassword.length==8 ) {
    setInfoCadastro('A senha deve conter mais de 8 caracteres')
  }
  else if (confirmPassword !== newPassword) {
    setInfoCadastro('As senhas não coincidem');
  }
  else if (newUser !== '' && newPassword !== '' && confirmPassword !== '') {
    setInfoCadastro('');

    try {
      const response = await fetch('https://smartgreen.azurewebsites.net/Usuarios/criaLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: newUser, login: newLogin, senha: newPassword }),
      });

      if (response.ok) {
        setModalActive(false);
      } else {
        // Lida com erros
        setInfoCadastro('Erro ao criar usuário');
      }
    } catch (error) {
      //console.error('Erro:', error);
      setInfoCadastro('Ocorreu um erro ao tentar criar usuário');
    }
  } else {
    setInfoCadastro('Por favor, preencha todos os campos!');
  }
}


    return(
        <View style={styles.container}>
            <Image 
                style={styles.image}
                resizeMode='contain'
                source={require('../../assets/images/loja_do_bacana_1.png')} 
            />
            <Text style={styles.Info}>
                {Info}
            </Text>
            <KeyboardAvoidingView behavior='position'  style={styles.inputContainer}>
                <Input 
                    hasIcon
                    placeholder='Login'
                    name='user-alt'
                    onChangeText={x => setLoginUser(x)}
                />
                <Senha 
                    hasIcon
                    placeholder='Senha'
                    name='key'
                    onChangeText={x => setSenhaUser(x)}
                />
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Entrar'
                    onPress={VerificaLogin}
                />
                <Button 
                    title='Cadastre-se'
                    onPress={handlePressCriarConta}
                />
            </View>
            <Modal 
                onRequestClose={()=> setModalActive(false)} 
                animationType="fade"
                visible={modalActive}
            >
                <KeyboardAvoidingView style={styles.modalView}>
                {/* <TouchableHighlight
                    onPress={()=> setModalActive(false)}
                >
                    <FontAwesome5
                        name='door-open'
                        size={25}
                    />
                </TouchableHighlight> */}
                    <Text style={styles.title}>
                        Crie sua conta 
                    </Text>
                    <View style={styles.separator}/>
                    <Input 
                        hasIcon='false'
                        placeholder='Nome'   
                        onChangeText={x => setNewUser(x)}                     
                    />
                    <Input 
                        hasIcon='false'
                        placeholder='Login'
                        onChangeText={x => setNewLogin(x)}
                    />
                    <Senha 
                        hasIcon='false'
                        placeholder='Senha'
                        onChangeText={x => setNewPassword(x)}
                        //secureTextEntry={true} 
                    />
                    <Senha 
                        hasIcon='false'
                        placeholder='Confirmar Senha'
                        onChangeText={x => setConfirmPassword(x)}
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
        </View>
    )
}