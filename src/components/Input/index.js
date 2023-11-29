import React from 'react';
import { 
    TextInput, 
    View
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';  

import { styles } from './styles';

export function Input({
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
            />
        </View>
    );
}