import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components";

export const Router = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
