import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./navigation";

const Stack = createStackNavigator();

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
