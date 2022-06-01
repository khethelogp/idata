import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/global";
import tw from "twrnc";
import { COLORS } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { PrimaryBTN } from "../../components";
import { useDB } from "../../contexts/DbContext";

const offers = [
  { package: "1GB", price: 60 },
  { package: "2GB", price: 120 },
  { package: "3GB", price: 180 },
  { package: "5GB", price: 250 },
  { package: "10GB", price: 300 },
];

const Item = ({ title, navigation, item }) => (
  <View
    style={[
      tw`flex justify-evenly items-center p-4 mx-4 my-2 rounded-lg`,
      styles.item,
    ]}
  >
    <Text style={[tw`text-white`, styles.title]}>{title}</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
      <Text
        style={[
          tw`px-4 text-white uppercase border border-white rounded-full`,
          styles.title,
        ]}
      >
        Buy
      </Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const { packages } = useDB();
  const renderItem = ({ item }) => (
    <Item title={item.title} navigation={navigation} item={item} />
  );

  return (
    <View style={[tw`bg-white`, globalStyles.container]}>
      <Text
        style={[tw`my-2 py-2 font-bold text-black text-2xl`, styles.username]}
      >
        Hello👋 {currentUser?.displayName}
      </Text>
      <Text style={[tw`text-black text-xl`]}>Available data balance: 0GB</Text>
      <View style={[tw`my-8`]}></View>
      <Text style={[tw`my-6 text-black text-xl`]}>Data Offers</Text>
      <View>
        <FlatList
          data={packages}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.price}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.primary,
    width: 139,
    height: 130,
  },
  title: {
    fontSize: 18,
  },
  username: {
    fontSize: 32,
  },
});
