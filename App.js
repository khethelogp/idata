import "react-native-gesture-handler";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import AuthProvider from "./contexts/AuthContext";
import DbProvider from "./contexts/DbContext";
import { Router } from "./routes/Router";

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
