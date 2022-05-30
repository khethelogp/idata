import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { COLORS } from "../../constants";

const offers = [
  {package: "1GB", price: 60},
  {package: "2GB", price: 120},
  {package: "3GB", price: 180},
  {package: "5GB", price: 250},
  {package: "10GB", price: 300},
];

const Item = ({ title }) => (
  <View style={[tw`flex justify-evenly items-center p-4 mx-4 my-2 rounded-lg`, styles.item]}>
    <Text style={[tw`text-white`, styles.title]}>{title}</Text>
    {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}> */}
    <TouchableOpacity onPress={() => {}}>
      <Text style={[tw`px-4 text-white uppercase border border-white rounded-full`, styles.title]}>Buy</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.package} />
  );

  return (
    <View style={[tw`bg-white`, globalStyles.container]}>
      <View>
        <Ionicons name="menu-outline" size={32} color="black" />
      </View>
      <Text style={[tw`my-4 text-black text-xl`]}>
        Data Offers
      </Text>
      <View>
        <FlatList 
          data={offers}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.price}
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
});
