import 'react-native-gesture-handler';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AuthScreen, HomeScreen, DetailsScreen } from "./screens";
import tw from "twrnc";
import MainContainer from "./navigation/MainContainer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent />
      <MainContainer />
      {/* <AuthScreen /> */}
      {/* <HomeScreen /> */}
      {/* <DetailsScreen /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  }
});
