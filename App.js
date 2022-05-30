import "react-native-gesture-handler";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import MainContainer from "./navigation/MainContainer";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent />
        <MainContainer />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
