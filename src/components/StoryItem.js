import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { stories } from "../data/stories";

export default function StoryItem({
  item,
  index,
}) {
  const navigation =
    useNavigation();

  const openStory = () => {
    navigation.navigate(
      "StoryViewer",
      {
        stories,
        initialIndex: index,
      }
    );
  };

  return (
    <Pressable
      onPress={openStory}
      style={styles.container}
    >
      <Image
        source={
          typeof item.image ===
          "string"
            ? { uri: item.image }
            : item.image
        }
        style={styles.image}
      />

      <Text style={styles.username}>
        {item.username}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 15,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#ff0069",
  },

  username: {
    marginTop: 5,
    fontSize: 12,
  },
});