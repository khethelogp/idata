import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProductsScreen, DetailsScreen } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

// Screen names
const homePage = "Home";
const productsPage = "Products";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homePage}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { padding: 20, height: 70 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn == homePage) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn == productsPage) {
              iconName = focused ? "archive" : "archive-outline";
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: COLORS.secondary,
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
        }}
      >
        <Tab.Screen name={homePage} component={HomeScreen} />
        <Tab.Screen name={productsPage} component={ProductsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
