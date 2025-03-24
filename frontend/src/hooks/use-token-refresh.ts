import { AppDispatch } from "@stores/store";
import { refreshUserToken } from "@stores/slices/auth/auth-actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const TokenRefreshChecker = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            try {
                dispatch(refreshUserToken());
            } catch (error) {
                console.error("Token refresh failed:", error);
            }
        };

        checkAndRefreshToken();

        const intervalId = setInterval(checkAndRefreshToken, 55 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

};

export default TokenRefreshChecker;
