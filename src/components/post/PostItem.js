import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function PostItem({ item }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(324);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Awesome 🔥",
    "Nice picture 😍",
  ]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleComment = () => {
    if (comment.trim() === "") return;

    setComments([...comments, comment]);
    setComment("");
  };
  

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.userInfo}>
        <View style={styles.leftSection}>
          <Image
            source={
              typeof item.profileImage === "string"
                ? { uri: item.profileImage }
                : item.profileImage
            }
            style={styles.profile}
          />

          <Text style={styles.username}>
            {item.username}
          </Text>
          
        </View>

        <Feather
          name="more-horizontal"
          size={22}
        />
      </View>

      {/* Post Image */}
      <Image
        source={
          typeof item.postImage === "string"
            ? { uri: item.postImage }
            : item.postImage
        }
        style={styles.postImage}
      />

      {/* Actions */}
      <View style={styles.actions}>

        <View style={styles.leftIcons}>

          <Pressable onPress={handleLike}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={28}
              color={liked ? "red" : "black"}
              style={styles.icon}
            />
          </Pressable>

          <Feather
            name="message-circle"
            size={26}
            style={styles.icon}
          />

          <Feather
            name="send"
            size={26}
            style={styles.icon}
          />

        </View>

        <Pressable onPress={handleSave}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={28}
          />
        </Pressable>

      </View>

      <Text style={styles.likes}>
        {likes} likes
      </Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.usernameCaption}>
          {item.username}
        </Text>{" "}
        {item.caption}
      </Text>

      {/* Comments */}
      <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <Text
            key={index}
            style={styles.comment}
          >
            {comment}
          </Text>
        ))}
      </View>

      {/* Add Comment */}
      <View style={styles.commentBox}>

        <TextInput
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
        />

        <Pressable onPress={handleComment}>
          <Text style={styles.postButton}>
            Post
          </Text>
        </Pressable>

      </View>

      <Text style={styles.time}>
        2 hours ago
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },

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
    width: 37,
    height: 37,
    borderRadius: 18.5,
  },

  username: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 13,
  },

  postImage: {
    width: "100%",
    height: 350,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  leftIcons: {
    flexDirection: "row",
  },

  icon: {
    marginRight: 18,
  },

  likes: {
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  caption: {
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  usernameCaption: {
    fontWeight: "bold",
  },

  commentsContainer: {
    paddingHorizontal: 10,
    marginTop: 5,
  },

  comment: {
    marginBottom: 4,
  },

  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },

  postButton: {
    color: "#0095f6",
    fontWeight: "bold",
  },

  time: {
    color: "gray",
    fontSize: 12,
    paddingHorizontal: 10,
    marginTop: 8,
  },
});