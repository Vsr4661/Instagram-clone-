import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Instagram
      </Text>

      <View style={styles.icons}>
        <Pressable>
          <Feather
            name="heart"
            size={24}
            style={styles.icon}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate(
              "Messages"
            )
          }
        >
          <Feather
            name="send"
            size={24}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
  },

  icons: {
    flexDirection: "row",
  },

  icon: {
    marginLeft: 20,
  },
});