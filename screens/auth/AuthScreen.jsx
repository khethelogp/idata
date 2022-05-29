import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { COLORS } from "../../constants";
import PrimaryBTN from "../../components/PrimaryBTN";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <View style={[tw`h-100`]}>
      <View style={[tw`flex justify-center p-5`, styles.box]}>
        <Text style={[tw`text-white text-2xl`, styles.welcomeText]}>
          {isLogin ? "Welcome \nBack" : "Create \nAccount"}
        </Text>
      </View>
      <View style={[tw`bg-red p-2`]}>
        <TextInput
          placeholder="Username"
          style={[tw`border rounded w-full py-2 px-3 my-2`]}
        />
        <TextInput
          placeholder="Email"
          style={[tw`border rounded w-full py-2 px-3 my-2`]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[tw`border rounded w-full py-2 px-3 my-2`]}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={[tw`border rounded w-full py-2 px-3 my-2`]}
        />
        <PrimaryBTN title="SignUp" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.primary,
    width: 390,
    height: 279,
  },
  welcomeText: {
    fontSize: 32,
  },
});

export default AuthScreen;
