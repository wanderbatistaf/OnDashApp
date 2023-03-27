import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";

const PaymentForm = ({ onSave }) => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [isPayed, setIsPayed] = useState(false);
    const API_URL = 'https://3kniis.sse.codesandbox.io/payments';

    const navigation = useNavigation();

    const handleSave = () => {
        const payment = {
            username,
            title,
            date,
            value: parseFloat(value),
            isPayed,
        };
        onSave(payment);
        setUsername('');
        setTitle('');
        setDate('');
        setValue('');
        setIsPayed(false);
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Title:</Text>
                <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Enter date (yyyy-mm-dd)"
                    value={date}
                    onChangeText={(text) => {
                        // Remove qualquer caractere que não seja número
                        const cleanedText = text.replace(/[^\d]/g, '');
                        // Insere o primeiro separador após o quarto caractere
                        let formattedText = cleanedText.slice(0, 4) + '-';
                        // Insere o segundo separador após o sexto caractere
                        if (cleanedText.length > 4) {
                            formattedText += cleanedText.slice(4, 6) + '-';
                        }
                        formattedText += cleanedText.slice(6, 8);
                        setDate(formattedText);
                    }}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Value:</Text>
                <TextInput style={styles.input} placeholder="Value"
                           value={value} onChangeText={(val) => setValue(val.replace(',', '.'))}
                           keyboardType="numeric" />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>IsPayed:</Text>
                <CheckBox style={styles.checkbox} value={isPayed} onValueChange={setIsPayed} />
            </View>
            <View style={styles.buttons}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={handleCancel} color="#FF0000" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        minWidth: 80,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 5,
    },
    checkbox: {
        marginLeft: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default PaymentForm;
