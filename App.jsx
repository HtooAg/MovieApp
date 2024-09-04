import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "./components/AppBar";
import Popular from "./components/Popular";
import SearchBar from "./components/SearchBar";

export default function App() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (query) => {
		setSearchQuery(query);
	};

	return (
		<View style={styles.container}>
			<AppBar />
			<SearchBar onSearchChange={handleSearchChange} />
			{!searchQuery.trim() ? <Popular /> : null}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
