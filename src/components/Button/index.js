import React from 'react';
import {
    TouchableHighlight,
    Text,
} from 'react-native';

import { styles } from './styles';

export function Button({ title, onPress, color }) {
    return (
        <TouchableHighlight
            style={[styles.container, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.txtButton}>
                {title}
            </Text>
        </TouchableHighlight>
    );
}