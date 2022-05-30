import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { globalStyles } from "../../styles/global";
import { COLORS } from "../../constants";
import { PrimaryBTN } from "../../components";

const DetailsScreen = ({route , navigation}) => {
  // const { title, price } = route.params;

  return (
    <View style={[tw`flex items-center`, globalStyles.container]}>
      <View
        style={[
          tw`flex justify-evenly p-4 my-2 rounded-lg shadow-md`,
          styles.card,
        ]}
      >
        {/* <Text>Data bundle: {title}</Text>
        <Text>Price: {price}</Text> */}
        <Text style={tw`text-lg`}>Data bundle: 1GB</Text>
        <Text style={tw`text-lg`}>Price: R60</Text>
        <Text style={tw`text-lg`}>Month to month</Text>
      </View>
      <View style={tw`items-center mt-6 w-100`}>
        <PrimaryBTN title="Buy"/>
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
