import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ProductsScreen,
  DetailsScreen,
  AuthScreen,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { navigationRef } from "./RootNavigation";

// Screen names
const mainPage = "Main";
const homePage = "Home";
const productsPage = "Products";
const detailsPage = "Details";
const authPage = "Auth";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={homePage}
        component={MainScreen}
        options={{ title: "" }}
      />
      {/* <Drawer.Screen name={productsPage} component={ProductsScreen} /> */}
    </Drawer.Navigator>
  );
};

const MainScreen = () => {
  return (
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
  );
};

const MainContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={authPage}>
        <Stack.Screen
          name={authPage}
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={mainPage}
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={detailsPage} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
