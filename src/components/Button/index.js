import React from 'react';
import { 
    TouchableHighlight,
    Text,
} from 'react-native';

import { styles } from './styles';

export function Button({title, onPress}){
    return (
        <TouchableHighlight 
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.txtButton}>
                {title}
            </Text>
        </TouchableHighlight>
    );
}