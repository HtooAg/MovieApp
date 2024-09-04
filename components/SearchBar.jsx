import {
	View,
	TextInput,
	StyleSheet,
	Image,
	Text,
	FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { useEffect, useState } from "react";

const token = process.env.TMDB_TOKEN;

export default function SearchBar({ onSearchChange }) {
	const [text, setText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	console.log("searchResults===>");

	const fetchSearch = async (query) => {
		if (query.length > 0) {
			console.log("logan", query.trim());

			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/search/movie?query=${query}`,
					{
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const json = await res.json();
				setSearchResults(json.results);
				console.log("results", json.results.length);
			} catch (error) {
				console.log("error", error);
			}
		} else {
			// alert(text.length.toString());
			// alert("No search results");
			setSearchResults([]);
		}
	};
	useEffect(() => {
		fetchSearch(text);
		onSearchChange(text);
	}, [text]);
	return (
		<>
			<View style={styles.searchBarContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search Movies"
					placeholderTextColor="#999"
					value={text}
					onChangeText={(value) => {
						setText(value);
						console.log("val", value);
					}}
				/>
				<AntDesign
					name="search1"
					size={20}
					color="black"
					style={styles.searchIcon}
				/>
			</View>

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={searchResults}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.container}>
						{item.poster_path ? (
							<Image
								style={styles.image}
								source={{
									uri: `http://image.tmdb.org/t/p/w342/${item.poster_path}`,
								}}
								resizeMode="cover"
							/>
						) : (
							<Text>No Image Available</Text>
						)}
						<Text style={styles.textTitle}>{item.title}</Text>
						<View style={styles.footerText}>
							<View style={styles.ratedStyle}>
								<AntDesign name="heart" size={16} color="red" />
								<Entypo name="star" size={17} color="#ebd21a" />
								<Text>{item.vote_average.toFixed(1)}</Text>
							</View>
							<View>
								<Text style={{ color: "gray" }}>
									{item.release_date.split("-")[0]}
								</Text>
							</View>
						</View>
					</View>
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginTop: 10,
		marginHorizontal: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 15,
		paddingHorizontal: 13,
		backgroundColor: "#f2f2f2",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	searchIcon: {
		position: "absolute",
		right: 28,
	},
	container: {
		width: 200,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	image: {
		height: 250,
		borderRadius: 8,
		marginVertical: 10,
	},
	footerText: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textTitle: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 10,
	},
	ratedStyle: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
	},
});
