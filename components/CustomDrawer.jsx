import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { COLORS } from "../constants";
import tw from "twrnc";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  const { currentUser, logout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: COLORS.secondary }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[tw`p-5 border-t-2 border-gray-200`]}>
        <Text style={tw`my-0.5 font-bold text-lg `}>
          {currentUser.displayName}
        </Text>
        <TouchableOpacity
          onPress={() => logout()}
          style={tw`flex flex-row items-center pt-3`}
        >
          <Ionicons name="exit-outline" size={24} color={COLORS.danger} />
          <Text style={tw`mx-2`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
