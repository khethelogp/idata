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

const products = [
  { package: "1GB", price: 60 },
  { package: "10GB", price: 300 },
];

const ProductButton = ({ title, btnStyle }) => (
  <TouchableOpacity onPress={() => {}}>
    <View style={[tw`px-4 py-2 bg-amber-400 rounded-full`, btnStyle]}>
      <Text style={tw`text-white`}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Item = ({ title }) => (
  <View
    style={[
      tw`flex justify-between p-4 my-2 rounded-lg shadow-md`,
      styles.item,
    ]}
  >
    <Text style={[tw`font-bold text-3xl`, styles.title]}>
      Data Bundle: {title}
    </Text>
    {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}> */}
    <View style={[tw`flex flex-row justify-between`]}>
      <ProductButton title="Top Up" btnStyle={styles.primaryBTN} />
      <ProductButton title="Cancel" btnStyle={styles.secondaryBTN} />
    </View>
  </View>
);

const ProductsScreen = () => {
  const renderItem = ({ item }) => <Item title={item.package} />;

  return (
    <View style={[tw`bg-white`, globalStyles.container]}>
      <Text style={[tw`my-4 text-black text-xl`]}>My Products</Text>
      <View style={[tw`items-center`]}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.price}
        />
      </View>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.gray,
    width: 300,
    height: 180,
  },
  title: {
    fontSize: 18,
  },
  primaryBTN: {
    backgroundColor: COLORS.primary,
  },
  secondaryBTN: {
    backgroundColor: COLORS.danger,
  },
});
