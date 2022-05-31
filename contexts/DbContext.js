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
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  const packagesCollectionRef = collection(db, "packages");
  const productsCollectionRef = collection(db, "products");

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
  const buyProduct = async (prodId, prodTitle, prodPrice, prodPeriod, uId) => {
    await addDoc(productsCollectionRef, {
      productID: prodId,
      productTitle: prodTitle,
      productPrice: prodPrice,
      productPeriod: prodPeriod,
      userId: uId,
    });
  };

  const fetchProducts = async () => {
    console.log(currentUser.uid);
    const data = await getDocs(
      query(productsCollectionRef, where("userID", "==", `${currentUser?.uid}`))
    );
    console.log(data.docs.length);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // use effect for when use changes
  useEffect(() => {
    fetchProducts();
  }, [currentUser]);

  // value to return forn useDB();
  const value = {
    packages,
    products,
    buyProduct,
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
