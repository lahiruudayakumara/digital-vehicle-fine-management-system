import {
  loadTokenFromSecureStore,
  logout,
} from "@/stores/slices/auth/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Alert } from "react-native";
import { AppDispatch } from "@/stores/store";
import { Redirect } from "expo-router";
import { RootState } from "@/stores/reducers";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  // Retrieve the token and role from the Redux store
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  // Determine if the user is authenticated and if the user is a rider
  const isAuthenticated = token !== null;
  const isAdmin = role === "RIDER";

  // Load the token from secure storage when the component mounts
  useEffect(() => {
    dispatch(loadTokenFromSecureStore()).finally(() => {
      setIsTokenLoaded(true);
    });
  }, [dispatch]);

  // State to manage the redirection path
  const [redirectPath, setRedirectPath] = useState<
    "/(auth)/login" | "/(tabs)" | null
  >(null);

  // Handle redirection logic based on authentication and role
  useEffect(() => {
    if (isTokenLoaded) {
      if (!isAuthenticated) {
        setRedirectPath("/(auth)/login"); // Redirect to login if not authenticated
      } else if (!isAdmin) {
        dispatch(logout()); // Logout if the user is not a rider
        Alert.alert("User is not a police officer");
      } else {
        setRedirectPath("/(tabs)"); // Redirect to the main tabs if authenticated and a rider
      }
    }
  }, [isTokenLoaded, isAuthenticated, isAdmin]);

  // Redirect the user if a redirect path is set
  if (redirectPath) {
    return <Redirect href={redirectPath} />;
  }

  // Show nothing while the token is being loaded
  if (!isTokenLoaded) {
    return null;
  }

  // Render nothing by default
  return null;
}
