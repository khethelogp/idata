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
import { useDB } from "../../contexts/DbContext";
import { async } from "@firebase/util";
import { useAuth } from "../../contexts/AuthContext";

const ProductButton = ({ title, btnStyle, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={[tw`px-4 py-2 bg-amber-400 rounded-full`, btnStyle]}>
      <Text style={tw`text-white`}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Item = ({ title, product }) => {
  const {
    cancelProduct,
    fetchProducts,
    fetchBalance,
    updateBalanceCancelation,
  } = useDB();
  const { currentUser } = useAuth();

  const handleCancel = async (prodId, prodValue) => {
    try {
      fetchBalance();
      cancelProduct(prodId);
      updateBalanceCancelation(
        currentUser.uid,
        currentUser.displayName,
        prodValue
      );
    } catch (error) {
      alert(error);
    } finally {
      await fetchProducts();
    }
  };

  return (
    <View
      style={[
        tw`flex justify-between p-4 my-2 rounded-lg shadow-md`,
        styles.item,
      ]}
    >
      <Text style={[tw`font-bold text-3xl`, styles.title]}>
        Data Bundle: {title}
      </Text>
      <View style={[tw`flex flex-row justify-between`]}>
        <ProductButton title="Top Up" btnStyle={styles.primaryBTN} />
        <ProductButton
          title="Cancel"
          btnStyle={styles.secondaryBTN}
          handlePress={() => handleCancel(product.id, product.value)}
        />
      </View>
    </View>
  );
};

const ProductsScreen = () => {
  const { products } = useDB();

  const renderItem = ({ item }) => (
    <Item title={item.productTitle} product={item} />
  );

  return (
    <View style={[tw`bg-white`, globalStyles.container]}>
      <Text style={[tw`my-4 text-black text-xl`]}>My Products</Text>
      <View style={[tw`items-center`]}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
