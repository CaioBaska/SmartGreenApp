import React, { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';

const Blink = ({ value1, value2, duration, repeat_count, style, children }) => {
    const [fadeAnimation] = useState(new Animated.Value(1));

    useEffect(() => {
        if (value1 > value2) {
            startAnimation();
        }
    }, [value1, value2]); // Monitorando a mudança de value1 e value2

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                })
            ]),
            {
                iterations: repeat_count
            }
        ).start();
    };

    return (
        <View style={style}>
            <Animated.View style={{ opacity: fadeAnimation }}>
                {children}
            </Animated.View>
        </View>
    );
};

export default Blink;
