import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { chats } from "../data/chats";

export default function MessagesScreen({
  navigation,
}) {
  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.chatItem}
          onPress={() =>
            navigation.navigate(
              "Chat",
              {
                chat: item,
              }
            )
          }
        >
          <Image
            source={{
              uri:
                item.profileImage,
            }}
            style={styles.avatar}
          />

          <View>
            <Text
              style={
                styles.username
              }
            >
              {item.username}
            </Text>

            <Text
              style={
                styles.message
              }
            >
              {item.lastMessage}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  username: {
    fontWeight: "bold",
    fontSize: 16,
  },

  message: {
    color: "gray",
    marginTop: 5,
  },
});