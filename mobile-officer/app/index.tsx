import { Redirect } from "expo-router";
import { RootState } from "@/stores/reducers";
import { useSelector } from "react-redux";

export default function Index() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
