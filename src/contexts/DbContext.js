import React, { useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const DbContext = React.createContext();
export function useDB() {
  return useContext(DbContext);
}

export default function DbProvider({ children }) {
  const [packages, setPackages] = useState([]);
  const [balance, setBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  const packagesCollectionRef = collection(db, "packages");
  const productsCollectionRef = collection(db, "products");
  const balancesCollectionRef = collection(db, "balances");

  // fetching data packages
  const fetchPackages = async () => {
    const data = await getDocs(packagesCollectionRef);
    setPackages(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort(function (a, b) {
          return a.price - b.price;
        })
    );
  };

  // buying a Package
  const buyProduct = async (
    prodId,
    prodTitle,
    prodPrice,
    prodPeriod,
    prodValue,
    uId
  ) => {
    await addDoc(productsCollectionRef, {
      productID: prodId,
      productTitle: prodTitle,
      productPrice: prodPrice,
      productPeriod: prodPeriod,
      productValue: prodValue,
      userId: uId,
    });
  };

  // fetch user products
  const fetchProducts = async () => {
    const data = await getDocs(
      query(productsCollectionRef, where("userId", "==", `${currentUser.uid}`))
    );
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // cancel a product
  const cancelProduct = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "products", id));
  };

  // update balance
  const updateBalance = async (uID, uName, bundleValue) => {
    await setDoc(doc(db, "balances", uID), {
      uid: uID,
      balance: balance + bundleValue,
      username: uName,
    });
  };

  const updateBalanceCancelation = async (uID, uName, bundleValue) => {
    await setDoc(doc(db, "balances", uID), {
      uid: uID,
      balance: balance - bundleValue,
      username: uName,
    });
  };

  const fetchBalance = async () => {
    if (products.length == 0) {
      setBalance(0);
    }

    const data = await getDocs(
      query(productsCollectionRef, where("userId", "==", `${currentUser.uid}`))
    );

    setBalance(
      data.docs
        .map((doc) => ({ ...doc.data() }["productValue"]))
        .reduce((a, b) => a + b, 0)
    );
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  useEffect(() => {
    fetchProducts();
    fetchBalance();
  }, [currentUser]);

  // value to return forn useDB();
  const value = {
    packages,
    products,
    buyProduct,
    cancelProduct,
    fetchProducts,
    balance,
    updateBalance,
    updateBalanceCancelation,
    fetchBalance,
    setBalance,
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
