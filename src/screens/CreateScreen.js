import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostContext } from "../context/PostContext";

export default function CreateScreen({ navigation }) {
  const { posts, setPosts } = useContext(PostContext);

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleShare = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      username: "vaibhavsingh",
      profileImage:
        "https://i.pravatar.cc/150?img=12",
      postImage: image,
      caption,
    };

    setPosts([newPost, ...posts]);

    setImage(null);
    setCaption("");

    navigation.navigate("Home");
  };

  return (
      <SafeAreaView style={styles.container}>

      <Pressable
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>
          Pick Image
        </Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <TextInput
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
        multiline
      />

      <Pressable
        style={styles.shareButton}
        onPress={handleShare}
      >
        <Text style={styles.shareText}>
          Share
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  imageButton: {
    backgroundColor: "#efefef",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  imageButtonText: {
    fontWeight: "bold",
  },

  preview: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
  },

  shareButton: {
    backgroundColor: "#0095f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  shareText: {
    color: "white",
    fontWeight: "bold",
  },
});