import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, Image, StyleSheet, TextInput, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Função para obter o token de autenticação do AsyncStorage
const getAuthToken = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    return access_token;
};

// Interceptor para adicionar o token de autenticação em todas as requisições
axios.interceptors.request.use(
    async config => {
        const token = await getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://3kniis.sse.codesandbox.io/auth/login', {
                username,
                password
            });
            console.log(response.data);

            // Armazena o token JWT no AsyncStorage
            await AsyncStorage.setItem('access_token', response.data.access_token);

            // Redireciona para a próxima tela
            //Alert.alert('Logado com sucesso!')
            navigation.navigate('PaymentsScreen', { token: response.data.access_token });
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao efetuar login!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('./on_dash.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input }
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        maxWidth: '100%',
        maxHeight: 100,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        color: 'black',
    },
});

export default LoginScreen;
