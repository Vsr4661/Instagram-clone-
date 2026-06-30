import { View, TextInput, FlatList, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { posts } from "../data/posts";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image
            source={
              typeof item.postImage === "string"
                ? { uri: item.postImage }
                : item.postImage
            }
            style={styles.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchInput: {
    backgroundColor: "#f0f0f0",
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },

  image: {
    width: "33.3%",
    aspectRatio: 1,
  },
});