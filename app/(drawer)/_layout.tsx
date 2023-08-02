import { Drawer } from "expo-router/drawer";

import DrawerContent from "@/components/DrawerContent";
import NavigationBar from "@/components/NavigationBar";

export default function AppLayout() {
	return (
		<Drawer
			screenOptions={{
				header(props) {
					return <NavigationBar {...props} />;
				},
			}}
			drawerContent={DrawerContent}
			initialRouteName="index"
		>
			<Drawer.Screen name="index" options={{ title: "Home" }} />
			<Drawer.Screen name="details" options={{ title: "Details" }} />
		</Drawer>
	);
}