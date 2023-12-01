import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

export function Senha({
  placeholder,
  hasIcon,
  name,
  onChangeText,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {hasIcon ? (
        <FontAwesome5
          style={styles.icon}
          name={name}
          size={20}
          color='black'
        />
      ) : null}
      <TextInput
        style={styles.txtInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <FontAwesome5
          style={styles.iconEye}
          name={isPasswordVisible ? 'eye-slash' : 'eye'}
          size={20}
          color='black'
        />
      </TouchableOpacity>
    </View>
  );
}
