import * as SecureStore from "expo-secure-store";

import Constants from "expo-constants";
import axios from "axios";

const baseURL = `${Constants.expoConfig?.extra?.API_URL}/api`;
console.log('Base URL:', baseURL);

const API = axios.create({ baseURL });

API.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log('Interceptor Error:', error);
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(String(error)))
);

export default API;