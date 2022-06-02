import React, { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";

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
  return signOut(auth);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
