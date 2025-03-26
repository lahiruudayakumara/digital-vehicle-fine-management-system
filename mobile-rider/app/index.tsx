import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "@/stores/store";
import { Redirect } from "expo-router";
import { RootState } from "@/stores/reducers";
import { loadTokenFromSecureStore } from "@/stores/auth/auth-actions";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuthenticated = token !== null;

  useEffect(() => {
    dispatch(loadTokenFromSecureStore()).finally(() => {
      setIsTokenLoaded(true);
    });
  }, [dispatch]);

  if (!isTokenLoaded) {
    return null;
  }

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
