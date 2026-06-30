import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

const { height } = Dimensions.get("window");

export default function ReelItem({
  item,
  isActive,
}) {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] =
    useState(false);

  const lastTap = useRef(null);

  const player = useVideoPlayer(
    item.video,
    (player) => {
      player.loop = true;
    }
  );

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive]);

  const handleVideoPress = () => {
    const now = Date.now();

    if (
      lastTap.current &&
      now - lastTap.current < 300
    ) {
      setLiked(true);
      setShowHeart(true);

      setTimeout(() => {
        setShowHeart(false);
      }, 800);
    }

    lastTap.current = now;
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.video}
        onPress={handleVideoPress}
      >
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      </Pressable>

      {showHeart && (
        <View style={styles.bigHeart}>
          <Ionicons
            name="heart"
            size={100}
            color="white"
          />
        </View>
      )}

      {/* Username and Caption */}
      <View style={styles.overlay}>
        <Text style={styles.username}>
          @{item.username}
        </Text>

        <Text style={styles.caption}>
          {item.caption}
        </Text>
      </View>

      {/* Right Side Icons */}
      <View style={styles.actions}>
        <Pressable
          onPress={() =>
            setLiked(!liked)
          }
        >
          <Ionicons
            name={
              liked
                ? "heart"
                : "heart-outline"
            }
            size={32}
            color={
              liked ? "red" : "white"
            }
          />
        </Pressable>

        <Ionicons
          name="chatbubble-outline"
          size={30}
          color="white"
          style={styles.actionIcon}
        />

        <Ionicons
          name="paper-plane-outline"
          size={30}
          color="white"
          style={styles.actionIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "black",
  },

  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    position: "absolute",
    bottom: 100,
    left: 15,
  },

  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },

  caption: {
    color: "white",
    fontSize: 15,
  },

  actions: {
    position: "absolute",
    right: 15,
    bottom: 120,
    alignItems: "center",
  },

  actionIcon: {
    marginTop: 25,
  },

  bigHeart: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
  },
});