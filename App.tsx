import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthScreen from "./screens/AuthScreen"; // Import the AuthScreen component
import { NativeBaseProvider } from "native-base";
import MainNavigator from "./MainNavigator";

const App = () => {
  const Stack = createStackNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" backgroundColor="white" />
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
