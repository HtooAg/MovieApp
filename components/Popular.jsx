import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useState, useEffect } from "react";

const api = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const token = process.env.TMDB_TOKEN;

export default function Popular() {
	const [popular, setPopular] = useState([]);

	const fetchData = async () => {
		const result = await fetch(`${api}`, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const json = await result.json();
		setPopular(json.results);
		//console.log(json.results);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Text
				style={{
					fontWeight: "bold",
					fontSize: 19,
					paddingHorizontal: 20,
					paddingTop: 10,
				}}
			>
				Popular Movies
			</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={popular}
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
