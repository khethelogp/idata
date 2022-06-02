import React from "react";
import { AuthScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const authPage = "Auth Screen";

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authPage}
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
