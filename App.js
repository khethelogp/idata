import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AuthScreen } from "./screens";
import tw from "twrnc";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar translucent />
      <AuthScreen />
    </SafeAreaView>
  );
}
