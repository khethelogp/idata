import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../../styles/global";
import tw from "twrnc";
import { COLORS } from "../../constants";
import { useDB } from "../../contexts/DbContext";
import { useAuth } from "../../contexts/AuthContext";

const ProductButton = ({ title, btnStyle, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={[tw`px-4 py-2 bg-amber-400 rounded-full`, btnStyle]}>
      <Text style={tw`text-white`}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Item = ({ title, product, navigation }) => {
  const {
    cancelProduct,
    fetchProducts,
    fetchBalance,
    updateBalanceCancelation,
  } = useDB();
  const { currentUser } = useAuth();

  const handleCancel = (id, value) => {
    return Alert.alert(
      "Cancel Package",
      `Are you sure you want to cancel your ${value} GB package ?`,
      [
        {
          text: "Yes",
          onPress: () => onCancel(id, value),
        },
        {
          text: "No",
          onPress: () => console.log("No"),
        },
      ]
    );
  };

  const onCancel = async (prodId, prodValue) => {
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
        <ProductButton
          title="Top Up"
          btnStyle={styles.primaryBTN}
          handlePress={() => {
            navigation.navigate("Details", {
              id: product["productID"],
              price: product["productPrice"],
              period: product["productPeriod"],
              title: product["productTitle"],
              value: product["productValue"],
            });
          }}
        />
        <ProductButton
          title="Cancel"
          btnStyle={styles.secondaryBTN}
          handlePress={() => handleCancel(product.id, product.productValue)}
        />
      </View>
    </View>
  );
};

const ProductsScreen = ({ navigation }) => {
  const { products } = useDB();

  const renderItem = ({ item }) => (
    <Item title={item.productTitle} product={item} navigation={navigation} />
  );

  return (
    <View style={[tw`bg-white`, globalStyles.container]}>
      <Text style={[tw`my-4 text-black text-xl`]}>My Products</Text>
      {products.length == 0 && (
        <Text style={tw`text-gray-500`}>
          You have no products, trying buying.
        </Text>
      )}

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
