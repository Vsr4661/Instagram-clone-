import { FlatList, StyleSheet } from "react-native";
import StoryItem from "./StoryItem";
import { stories } from "../data/stories";

export default function StoryList() {
  return (
    <FlatList
      data={stories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <StoryItem
          item={item}
          index={index}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});