import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";
import tw from "twrnc";

const PrimaryBTN = ({ handlePress, title, props }) => {
  return (
    <TouchableOpacity
      style={[
        tw`bg-sky-600 rounded-md w-4/5 h-20 my-2 flex justify-center items-center`,
        styles.container,
      ]}
      onPress={handlePress}
    >
      <Text style={[tw`text-white text-2xl`]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.extraLarge,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
});

export default PrimaryBTN;
