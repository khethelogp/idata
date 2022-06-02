import "react-native-gesture-handler";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import AuthProvider from "./src/contexts/AuthContext";
import DbProvider from "./src/contexts/DbContext";
import { Router } from "./src/routes/Router";

export default function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar translucent />
          <Router />
        </SafeAreaView>
      </DbProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
