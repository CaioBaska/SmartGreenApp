import React from 'react';
import { 
    TextInput, 
    View
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';  

import { styles } from './styles';

export function Senha({
    placeholder, 
    hasIcon,
    name,
    onChangeText,
}){
    return (
        <View style={styles.container}>
            {
                hasIcon ? 
                <FontAwesome5 
                    style={styles.icon}
                    name={name}
                    size={20}
                    color='black'
                /> : null 
            }
            <TextInput 
                style={styles.txtInput}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={true}
            />
        </View>
    );
}