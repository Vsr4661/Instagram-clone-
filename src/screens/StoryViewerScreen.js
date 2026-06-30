import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function StoryViewerScreen({
  route,
  navigation,
}) {
  const { stories, initialIndex = 0 } =
    route.params;

  const [currentIndex, setCurrentIndex] =
    useState(initialIndex);

  const progress =
    useRef(new Animated.Value(0))
      .current;

  const translateY =
    useRef(new Animated.Value(0))
      .current;

  const currentStory =
    stories[currentIndex];

  const handleNext = () => {
    progress.setValue(0);
    translateY.setValue(0);

    if (
      currentIndex <
      stories.length - 1
    ) {
      setCurrentIndex(
        currentIndex + 1
      );
    } else {
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    progress.setValue(0);
    translateY.setValue(0);

    if (currentIndex > 0) {
      setCurrentIndex(
        currentIndex - 1
      );
    }
  };

  useEffect(() => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        handleNext();
      }
    });
  }, [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder:
        (_, gestureState) => {
          return (
            Math.abs(
              gestureState.dy
            ) > 10
          );
        },

      onPanResponderMove:
        (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(
              gestureState.dy
            );
          }
        },

      onPanResponderRelease:
        (_, gestureState) => {
          if (
            gestureState.dy > 150
          ) {
            Animated.timing(
              translateY,
              {
                toValue: height,
                duration: 200,
                useNativeDriver: true,
              }
            ).start(() => {
              navigation.goBack();
            });
          } else {
            Animated.spring(
              translateY,
              {
                toValue: 0,
                useNativeDriver: true,
              }
            ).start();
          }
        },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY },
          ],
          opacity:
            translateY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0.5],
              extrapolate:
                "clamp",
            }),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Image
        source={
          typeof currentStory.storyImage ===
          "string"
            ? {
                uri:
                  currentStory.storyImage,
              }
            : currentStory.storyImage
        }
        style={styles.image}
      />

      {/* Progress Bars */}
      <View
        style={
          styles.progressContainer
        }
      >
        {stories.map(
          (_, index) => (
            <View
              key={index}
              style={
                styles.progressBar
              }
            >
              {index <
                currentIndex && (
                <View
                  style={
                    styles.progressFill
                  }
                />
              )}

              {index ===
                currentIndex && (
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        progress.interpolate(
                          {
                            inputRange: [
                              0,
                              1,
                            ],
                            outputRange:
                              [
                                "0%",
                                "100%",
                              ],
                          }
                        ),
                    },
                  ]}
                />
              )}
            </View>
          )
        )}
      </View>

      {/* User Info */}
      <View
        style={styles.userContainer}
      >
        <Image
          source={{
            uri: currentStory.image,
          }}
          style={styles.avatar}
        />

        <Text
          style={styles.username}
        >
          {currentStory.username}
        </Text>

        <Pressable
          style={
            styles.closeButton
          }
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="close"
            size={30}
            color="white"
          />
        </Pressable>
      </View>

      {/* Left Tap */}
      <Pressable
        style={styles.left}
        onPress={handlePrevious}
      />

      {/* Right Tap */}
      <Pressable
        style={styles.right}
        onPress={handleNext}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  image: {
    width,
    height,
    resizeMode: "cover",
  },

  progressContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
  },

  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor:
      "rgba(255,255,255,0.3)",
    marginHorizontal: 2,
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "white",
  },

  userContainer: {
    position: "absolute",
    top: 70,
    left: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  closeButton: {
    marginLeft: "auto",
  },

  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  left: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width / 2,
    height,
  },

  right: {
    position: "absolute",
    right: 0,
    top: 0,
    width: width / 2,
    height,
  },
});