import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ label, onChangeDate }) => {
    const [date, setDate] = useState(new Date()); // Defina uma data inicial aqui
    const [showDatePicker, setShowDatePicker] = useState(false);

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerHandler = () => {
        setShowDatePicker(false);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        onChangeDate(currentDate);
        hideDatePickerHandler(); // Esconda o seletor de data ao selecionar uma data
    };

    return (
        <View>
            <Text>{label}</Text>
            <Button title={`Selecionar ${label}`} onPress={showDatePickerHandler} />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            {/* Mostrar a data selecionada como texto */}
        </View>
    );
};

export default MyDatePicker;
