import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import Modal from "react-native-modal";
import axios from "axios";
import moment from "moment";

const PaymentsScreen = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigation = useNavigation();


    const renderPayments = () => {
        return payments.map((payment, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => {if (isEditMode) {console.log('Editando pagamento')}}}>
                    <View style={styles.paymentContainer}>
                        <Text style={styles.paymentLabel}>{payment.label}</Text>
                        <Text style={styles.paymentValue}>{payment.value}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    const handleAddPayment = () => {
        navigation.navigate('AddPayments');
    }

    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://3kniis.sse.codesandbox.io/payments');
            setPayments(result.data.items);
        };

        fetchData();
    }, []);

    const formatValue = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const handlePaymentSelection = (payment) => {
        const paymentIndex = selectedPayments.findIndex((item) => item.id === payment.id);

        if (paymentIndex >= 0) {
            setSelectedPayments((prevSelected) => prevSelected.filter((item) => item.id !== payment.id));
        } else if (selectedPayments.length < 5) {
            setSelectedPayments((prevSelected) => [...prevSelected, payment]);
        }
    };

    const isPaymentSelected = (payment) => {
        return selectedPayments.some((item) => item.id === payment.id);
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const filteredPayments = payments.filter((payment) =>
        payment.username.toLowerCase().includes(searchText.toLowerCase()) ||
        payment.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderFloatingButton = () => {
        return (
            <View style={styles.floatingButtonContainer}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.floatingButton}>
                    <Text style={styles.floatingButtonLabel}>+</Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setIsEditMode(true)}>
                            <Text style={styles.modalOption}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AddPaymentsScreen')}>
                            <Text style={styles.modalOption}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.modalOption}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Pesquisar..."
                onChangeText={handleSearch}
                value={searchText}
                platform="default"
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
            />
            <View style={styles.tableRow}>
                <Text style={[styles.cell, styles.header]}>Username</Text>
                <Text style={[styles.cell, styles.header]}>Value</Text>
                <Text style={[styles.cell, styles.header]}>Título</Text>
            </View>
            <FlatList
                data={filteredPayments}
                keyExtractor={(item, index) => {
                    const key = item?.id?.toString() || index.toString();
                    return key;
                }}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text style={styles.cell}>{item.username}</Text>
                        <Text style={styles.cell}>{formatValue(item.value)}</Text>
                        <View style={styles.paymentDetails}>
                            <Text>{item.title}</Text>
                            <Text>{formatDate(item.date)}</Text>
                            <CheckBox value={item.isPayed} disabled={true} />
                        </View>
                    </View>
                )}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={10}
                onEndReachedThreshold={0.5}
                onEndReached={() => console.log('reached end of list')}
            />
            {renderFloatingButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 16,
        position: 'relative',
        color: 'black',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: 'black',
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        marginHorizontal: 8,
    },
    header: {
        fontWeight: 'bold',
    },
    paymentDetails: {
        flex: 1,
        marginHorizontal: 8,
        marginTop: 8,
        color: 'black',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        height: '100%',
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066CC',
    },
    addButtonLabel: {
        color: '#fff',
        backgroundColor: '#0066CC',
        fontSize: 24,
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        height: '100%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#fa7016',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingButtonLabel: {
        color: '#fff',
        fontSize: 24,
    },
    searchContainer: {
        backgroundColor: '#FFF',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchInputContainer: {
        backgroundColor: '#EAEAEA',
        borderRadius: 30,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'stretch',
    },
    modalOption: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 8,
    },
});


export default PaymentsScreen;
