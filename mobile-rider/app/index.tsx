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
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  const isAuthenticated = token !== null;
  const isAdmin = role === "RIDER";

  useEffect(() => {
    dispatch(loadTokenFromSecureStore()).finally(() => {
      setIsTokenLoaded(true);
    });
  }, [dispatch]);

  const [redirectPath, setRedirectPath] = useState<
    "/(auth)/login" | "/(tabs)" | null
  >(null);

  useEffect(() => {
    if (isTokenLoaded) {
      if (!isAuthenticated) {
        setRedirectPath("/(auth)/login");
      } else if (!isAdmin) {
        dispatch(logout());
        Alert.alert("User is not a police officer");
      } else {
        setRedirectPath("/(tabs)");
      }
    }
  }, [isTokenLoaded, isAuthenticated, isAdmin]);

  if (redirectPath) {
    return <Redirect href={redirectPath} />;
  }

  if (!isTokenLoaded) {
    return null;
  }

  return null;
}
