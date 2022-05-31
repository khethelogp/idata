import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, ProductsScreen, DetailsScreen } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

// Screen names
const mainPage = "Main";
const homePage = "Home";
const productsPage = "Products";
const detailsPage = "Details";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={homePage}
        component={MainScreen}
        options={{ title: "" }}
      />
      <Drawer.Screen name={productsPage} component={ProductsScreen} />
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

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mainPage}
        component={AppDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={detailsPage} component={DetailsScreen} />
    </Stack.Navigator>
  );
};
