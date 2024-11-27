"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  updateEmail,
} from "firebase/auth";

import { auth } from "../firebase/auth_config";

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
}

type AuthContextProps = {
  currentUser: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (email: string, password: string) => Promise<any>; // Update the type accordingly
  login: (email: string, password: string) => Promise<any>; // Update the type accordingly
  logout: any;
  updateuserProfile: (currentUser: User, displayName: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>; // Update the type accordingly
  dropdownId: string;
  setDropdownId: React.Dispatch<React.SetStateAction<string>>;
  imageKey: string;
  setImageKey: React.Dispatch<React.SetStateAction<string>>;
  modalId: string;
  setModalId: React.Dispatch<React.SetStateAction<string>>;
  alertClasses: string[];
  setAlertClasses: React.Dispatch<React.SetStateAction<string[]>>;
  lastDetectionTime: number;
  setLastDetectionTime: React.Dispatch<React.SetStateAction<number>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | false>(false);

  const [dropdownId, setDropdownId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [imageKey, setImageKey] = useState<string>("");
  const [modalId, setModalId] = useState<string>("");
  const [lastDetectionTime, setLastDetectionTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Flag to prevent multiple uploads

  // State to hold the list of selected classes
  const [alertClasses, setAlertClasses] = useState<string[]>([""]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  //   user login function
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   user sigin function
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   user logout function
  const logout = () => {
    return signOut(auth);
  };

  //   user rest password function
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  //   user update profile function
  const updateuserProfile = (currentUser: User, displayName: string) => {
    return updateProfile(currentUser, {
      displayName,
    });
  };

  //   user update profile function
  const updateUserEmail = (currentUser: User, email: string) => {
    return updateEmail(currentUser, email);
  };

  useLayoutEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user || null);
      setLoading(false);
    });
    return unSubscriber;
  }, []);

  const authContextValue: AuthContextProps = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    loading,
    setLoading,
    updateuserProfile,
    dropdownId,
    setDropdownId,
    imageKey,
    setImageKey,
    modalId,
    setModalId,
    alertClasses,
    setAlertClasses,
    lastDetectionTime,
    setLastDetectionTime,
    isProcessing,
    setIsProcessing,
    selectedItems,
    setSelectedItems,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
