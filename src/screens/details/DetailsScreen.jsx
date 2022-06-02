import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import tw from "twrnc";
import { globalStyles } from "../../styles/global";
import { COLORS } from "../../constants";
import { PrimaryBTN } from "../../components";
import { useDB } from "../../contexts/DbContext";
import { useAuth } from "../../contexts/AuthContext";

const DetailsScreen = ({ route, navigation }) => {
  const { price, period, title, value, id } = route.params;
  const { currentUser } = useAuth();
  const { buyProduct, updateBalance, fetchBalance, setBalance } = useDB();
  const [loading, setLoading] = useState(false);

  const handleBuy = () => {
    return Alert.alert(
      "Confirm Purchase",
      `Are you sure you want to buy ${title} for R${price}`,
      [
        {
          text: "Yes",
          onPress: () => onBuy(),
        },
        {
          text: "No",
          onPress: () => console.log("No"),
        },
      ]
    );
  };

  const onBuy = () => {
    try {
      setLoading(true);
      buyProduct(id, title, price, period, value, currentUser.uid);
      fetchBalance();
      updateBalance(currentUser.uid, currentUser.displayName, value);
      navigation.navigate("Home");
    } catch (error) {
      Alert.error("error", error.message);
    }

    setLoading(false);
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
        <PrimaryBTN title="Buy" handlePress={handleBuy} loading={loading} />
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
