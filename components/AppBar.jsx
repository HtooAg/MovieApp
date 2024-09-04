import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function AppBar() {
	return (
		<>
			<View style={styles.appBarContainer}>
				<Text style={styles.leftContent}>
					<Feather name="menu" size={24} color="white" />
				</Text>
				<Text style={styles.centerContent}>Movie App</Text>
				<Text style={styles.rightContent}>
					<View style={styles.iconContainer}>
						<Feather name="settings" size={24} color="white" />
					</View>
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	appBarContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: "#333",
	},
	centerContent: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
	rightContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconContainer: {
		flexDirection: "row",
		gap: 10,
	},
});
