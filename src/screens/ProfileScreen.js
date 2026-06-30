import { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

import { posts } from "../data/posts";

export default function ProfileScreen({ navigation }) {
    const { profile } = useContext(ProfileContext);
    const [activeTab, setActiveTab] = useState("posts");
    const dataToRender =
  activeTab === "posts" ? posts : [];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
  key={activeTab}
  data={dataToRender}
        numColumns={3}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
  {profile.username}
</Text>

              <View style={styles.headerIcons}>
                <Ionicons
                  name="add-circle-outline"
                  size={28}
                  style={styles.headerIcon}
                />

                <Ionicons
                  name="menu"
                  size={28}
                />
              </View>
            </View>

            {/* Profile Section */}
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/IMG_8052.jpg")}
                style={styles.profileImage}
              />

              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.number}>
                    {posts.length}
                  </Text>
                  <Text>Posts</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.number}>
                    250
                  </Text>
                  <Text>Followers</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.number}>
                    180
                  </Text>
                  <Text>Following</Text>
                </View>
              </View>
            </View>

            {/* Bio */}
            <View style={styles.bio}>
              <Text style={styles.name}>
  {profile.name}
</Text>

              <Text>
                {profile.bio}
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
             <Pressable
  style={styles.button}
  onPress={() =>
    navigation.navigate("EditProfile")
  }
>
  <Text style={styles.buttonText}>
    Edit Profile
  </Text>
</Pressable>

              <Pressable
  style={styles.button}
  onPress={() =>
    navigation.navigate("EditProfile")
  }
>   
                <Text style={styles.buttonText}>
                  Share Profile
                </Text>
              </Pressable>
            </View>

            {/* Highlights */}
            <View style={styles.highlightsContainer}>
              <View style={styles.highlight}>
                <View style={styles.highlightCircle} />
                <Text style={styles.highlightText}>
                  New
                </Text>
              </View>

              <View style={styles.highlight}>
                <View style={styles.highlightCircle} />
                <Text style={styles.highlightText}>
                  Trips
                </Text>
              </View>

              <View style={styles.highlight}>
                <View style={styles.highlightCircle} />
                <Text style={styles.highlightText}>
                  Friends
                </Text>
              </View>

              <View style={styles.highlight}>
                <View style={styles.highlightCircle} />
                <Text style={styles.highlightText}>
                  Coding
                </Text>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>

  <Pressable
    style={[
      styles.tab,
      activeTab === "posts" && styles.activeTab,
    ]}
    onPress={() => setActiveTab("posts")}
  >
    <Ionicons
      name="grid-outline"
      size={24}
      color={
        activeTab === "posts"
          ? "black"
          : "gray"
      }
    />
  </Pressable>

  <Pressable
    style={[
      styles.tab,
      activeTab === "tagged" &&
        styles.activeTab,
    ]}
    onPress={() => setActiveTab("tagged")}
  >
    <Ionicons
      name="person-circle-outline"
      size={24}
      color={
        activeTab === "tagged"
          ? "black"
          : "gray"
      }
    />
  </Pressable>

</View>
          </View>
        }
        ListEmptyComponent={
  activeTab === "tagged" ? (
    <View
      style={{
        padding: 50,
        alignItems: "center",
      }}
    >
      <Ionicons
        name="person-circle-outline"
        size={80}
        color="gray"
      />

      <Text style={{ marginTop: 15 }}>
        No tagged posts yet
      </Text>
    </View>
  ) : null
}
        renderItem={({ item }) =>
  activeTab === "posts" ? (
    <Image
      source={
        typeof item.postImage === "string"
          ? { uri: item.postImage }
          : item.postImage
      }
      style={styles.post}
    />
  ) : (
    <View style={styles.post} />
  )
}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    marginRight: 20,
  },

  topSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  stat: {
    alignItems: "center",
  },

  number: {
    fontWeight: "bold",
    fontSize: 18,
  },

  bio: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  button: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
  },

  highlightsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  highlight: {
    alignItems: "center",
    marginRight: 20,
  },

  highlightCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#efefef",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  highlightText: {
    marginTop: 6,
    fontSize: 12,
  },

  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  activeTab: {
  borderBottomWidth: 2,
  borderBottomColor: "black",
},

  tab: {
  flex: 1,
  alignItems: "center",
  paddingVertical: 12,
},

  post: {
  flex: 1,
  aspectRatio: 1,
  margin: 1,
  backgroundColor: "#f2f2f2",
},
});