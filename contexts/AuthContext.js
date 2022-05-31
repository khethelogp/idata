import React, { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from "../navigation/RootNavigation";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

const signup = async (email, password, userName) => {
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    return updateProfile(res.user, {
      displayName: `${userName}`,
    });
  });
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  // RootNavigation.navigate("Auth");
  return signOut(auth);
};

const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

const updateUserEmail = (email) => {
  return updateEmail(auth.currentUser, email);
};

const updateUserPassword = (password) => {
  return updatePassword(auth.currentUser, password);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        RootNavigation.navigate("Main");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
