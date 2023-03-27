import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import PaymentsScreen from "./PaymentsScreen";
import AddPaymentsScreen from "./AddPaymentsScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
            <Stack.Screen name="AddPaymentsScreen" component={AddPaymentsScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default MainStack;
