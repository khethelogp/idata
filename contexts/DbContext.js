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
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  const packagesCollectionRef = collection(db, "packages");
  const usersCollectionRef = collection(db, "users");
  const productsCollectionRef = collection(db, "products");
  const purchaseCollectionRef = collection(db, "purchases");

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

  // fetch user products
  const fetchProducts = async () => {
    const data = await getDocs(
      query(productsCollectionRef, where("userId", "==", `${currentUser.uid}`))
    );
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // cancel a product
  const cancelProduct = async (id) => {
    await deleteDoc(doc(db, productsCollectionRef, id));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [currentUser]);

  // console.log(products);

  // value to return forn useDB();
  const value = {
    packages,
    products,
    buyProduct,
    cancelProduct,
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
