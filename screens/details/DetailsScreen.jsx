import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import tw from "twrnc";
import { globalStyles } from "../../styles/global";
import { COLORS } from "../../constants";
import { PrimaryBTN } from "../../components";
import { useDB } from "../../contexts/DbContext";
import { useAuth } from "../../contexts/AuthContext";

const DetailsScreen = ({ route, navigation }) => {
  const { price, period, title, value, id } = route.params;
  const { buyProduct } = useDB();
  const { currentUser } = useAuth();

  const handleBuy = () => {
    try {
      buyProduct(id, title, price, period, value, currentUser.uid);
      navigation.navigate("Home");
    } catch (error) {
      Alert.error("error", error.message);
    }
  };

  return (
    <View style={[tw`flex items-center`, globalStyles.container]}>
      <View
        style={[
          tw`flex justify-evenly p-4 my-2 rounded-lg shadow-md`,
          styles.card,
        ]}
      >
        <Text style={tw`text-lg`}>Data bundle: {title}</Text>
        <Text style={tw`text-lg`}>Price: R{price}</Text>
        <Text style={tw`text-lg`}>{period}</Text>
      </View>
      <View style={tw`items-center mt-6 w-100`}>
        <PrimaryBTN title="Buy" handlePress={handleBuy} />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray,
    width: 300,
    height: 180,
  },
});
