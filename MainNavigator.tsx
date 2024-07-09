import React, { useEffect } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeComponent from "./tabs/home";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const BottomTab = createBottomTabNavigator();

const MainNavigator = ({ navigation }: any) => {
  const { token, isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
    }
  }, [isAuthenticated, navigation]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#fafafa",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor: "#ffffff",
          position: "absolute",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 0,
          marginBottom: 5,
          color: "#2b2b2b",
          fontWeight: "bold",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        children={(props) => <HomeComponent {...props} />}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="home-outline" size={24} color={"#2b2b2b"} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
