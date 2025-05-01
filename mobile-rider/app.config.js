import "dotenv/config";

export default {
  expo: {
    name: "mobile-rider",
    slug: "mobile-rider",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    entryPoint: "index.tsx",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.mobilerider"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-secure-store",
      [
        "@intercom/intercom-react-native",
        {
          "appId": "cqcr9vao",
          "androidApiKey": "android_sdk-3cbff8d8931dbb8e5b99f7b607decdcafc8ac55b",
          "iosApiKey": "ios_sdk-753cda7d838a9809af20954b4764982dd419a63c"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      API_URL: process.env.API_URL,
    }
  }
};