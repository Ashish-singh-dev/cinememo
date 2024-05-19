import React from "react";
import { Link } from "expo-router";
import { Image, View, Pressable, Keyboard } from "react-native";

import { useAuth } from "@/context/auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Snackbar } from "@/components/ui/use-snackbar";
import { useAppTheme } from "@/context/material-3-theme-provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type AuthSchema, authSchema } from "@/lib/validations/auth";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

function SignIn() {
	const insets = useSafeAreaInsets();
	const theme = useAppTheme();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSecureEntry, setIsSecureEntry] = React.useState(true);
	const { signIn, sendPasswordResetEmail } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
		clearErrors,
		resetField,
		setError,
		getValues,
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function handleEyePress() {
		setIsSecureEntry((prev) => !prev);
	}

	async function onSubmit(data: AuthSchema) {
		Keyboard.dismiss();
		setIsLoading(true);

		try {
			await signIn(data.email, data.password);
		} catch (error) {
			resetField("password");

			if (error instanceof Error) {
				Snackbar({
					text: error.message,
				});
			}
			Snackbar({
				text: "Failed to login",
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleForgotPassword() {
		Keyboard.dismiss();
		resetField("password");

		const email = getValues("email");

		if (!email) {
			Snackbar({
				text: "Please type your email in the email field",
			});
			setError("email", {
				message: "Email is required",
				type: "required",
			});
			return;
		}

		clearErrors("email");

		try {
			setIsLoading(true);
			await sendPasswordResetEmail(email);
			Snackbar({
				text: "Email sent, if not found please check your spam folder",
			});
		} catch (error: any) {
			if (error?.code && error.code === "auth/invalid-email") {
				setError("email", { message: "Invalid email", type: "validate" });
				Snackbar({
					text: "Invalid email",
				});
			} else {
				Snackbar({
					text: "Failed to send email, please try later",
				});
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View
			className="flex flex-1 justify-center items-center"
			style={{
				gap: 20,
				// Paddings to handle safe area
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
			<View className="flex justify-center items-center gap-3 px-5">
				<Image
					source={require("@/assets/images/icon_light.png")}
					style={{
						width: 50,
						height: 50,
						tintColor: theme.colors.primary,
					}}
				/>
				<View className="flex gap-1">
					<Text variant="titleMedium" className="text-center text-xl">
						Welcome back
					</Text>
					<Text variant="labelLarge" className="text-center">
						Please enter your details to sign in.
					</Text>
				</View>
			</View>

			<View className="flex justify-between items-center  self-stretch px-5">
				<View className="self-stretch">
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								mode="outlined"
								label="Email"
								className="w-full"
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						)}
						name="email"
					/>
					<HelperText type="error" visible={!!errors.email}>
						{errors.email?.message}
					</HelperText>
				</View>

				<View className="self-stretch">
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								mode="outlined"
								label="Password"
								className="w-full"
								secureTextEntry={isSecureEntry}
								autoCapitalize="none"
								right={
									isSecureEntry ? (
										<TextInput.Icon icon="eye" onPress={handleEyePress} />
									) : (
										<TextInput.Icon icon="eye-off" onPress={handleEyePress} />
									)
								}
							/>
						)}
						name="password"
					/>
					<HelperText type="error" visible={!!errors.password}>
						{errors.password?.message}
					</HelperText>
				</View>

				<Pressable
					className="self-end"
					onPress={handleForgotPassword}
					disabled={isLoading}
				>
					<Text variant="titleMedium" className="text-blue-500 underline">
						Forgot Password?
					</Text>
				</Pressable>

				<Button
					mode="contained"
					onPress={handleSubmit(onSubmit)}
					className="self-stretch mt-5"
					loading={isLoading}
					disabled={isLoading}
				>
					SIGN IN
				</Button>
			</View>

			<Text variant="titleSmall">
				Don't have an account?{" "}
				<Link href="/sign-up">
					<Text variant="titleMedium" className="text-blue-500 ml-2 underline">
						SIGN UP
					</Text>
				</Link>
			</Text>

			<View className="absolute bottom-5 px-5">
				<Text className="text-center">
					By singing in you accept our{" "}
					<Link href="https://notes-ashish.netlify.app/">
						<Text className="text-blue-500 ml-2 underline">Terms of use</Text>
					</Link>{" "}
					and{" "}
					<Link href="https://notes-ashish.netlify.app/">
						<Text className="text-blue-500 ml-2 underline">Privary policy</Text>
					</Link>
				</Text>
			</View>
		</View>
	);
}

export default SignIn;
