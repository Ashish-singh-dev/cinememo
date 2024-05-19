import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
	name: "Cinememo",
	slug: "cinememo",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	scheme: "cinememo",
	userInterfaceStyle: "automatic",
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.homocodian.cinememo",
		splash: {
			image: "./assets/images/splash_light.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
			dark: {
				image: "./assets/images/splash.png",
				resizeMode: "contain",
				backgroundColor: "#000000",
			},
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#ffffff",
			monochromeImage: "./assets/images/adaptive-icon.png",
		},
		softwareKeyboardLayoutMode: "pan",
		package: "com.homocodian.cinememo",
		splash: {
			image: "./assets/images/splash_light.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
			dark: {
				image: "./assets/images/splash.png",
				resizeMode: "contain",
				backgroundColor: "#000000",
			},
		},
	},
	web: {
		bundler: "metro",
		output: "static",
		favicon: "./assets/images/favicon.png",
	},
	plugins: [
		"expo-router",
		[
			"expo-build-properties",
			{
				ios: {
					newArchEnabled: true,
				},
				android: {
					newArchEnabled: true,
				},
			},
		],
	],
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	extra: {
		router: {
			origin: false,
		},
		eas: {
			projectId: "383758ce-1b00-4197-a465-0975fb4ba191",
		},
	},
	owner: "homocodian",
};

export default config;
