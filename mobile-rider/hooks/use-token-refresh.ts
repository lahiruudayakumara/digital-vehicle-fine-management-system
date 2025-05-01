import * as SecureStore from "expo-secure-store";

import { logout, refreshUserToken } from "@/stores/slices/auth/auth-actions";

import { AppDispatch } from "@/stores/store";
import Logger from "@/utils/logger";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const TokenRefreshChecker = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            try {
                const refreshToken = await SecureStore.getItemAsync("refreshToken")

                if (!refreshToken) {
                    Logger.error("Refresh token not found. Logging out.");
                    await dispatch(logout());
                    return;
                }

                const result = await dispatch(refreshUserToken()).unwrap();

                if (!result.token) {
                    Logger.error("Token refresh failed. Logging out.");
                    await dispatch(logout());
                } else {
                    Logger.info("Token refreshed successfully");
                }
            } catch (err) {
                Logger.error("Token refresh failed:", err);
                await dispatch(logout());
            }
        };

        checkAndRefreshToken();
        const intervalId = setInterval(checkAndRefreshToken, 55 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return null;
};

export default TokenRefreshChecker;
