import { View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostHeader() {
  return (
    <View style={styles.userInfo}>

      <View style={styles.leftSection}>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=10",
          }}
          style={styles.profile}
        />

        <Text style={styles.username}>
          Alex
        </Text>

      </View>

      <Feather
        name="more-horizontal"
        size={22}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  username: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});