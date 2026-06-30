import React, {
  useState,
  useRef,
} from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ChatScreen({
  route,
}) {
  const { chat } = route.params;

  const [messages, setMessages] =
    useState(chat.messages);

  const [input, setInput] =
    useState("");

  const flatListRef =
    useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setInput("");

    // Fake reply
    setTimeout(() => {
      const reply = {
        id: (
          Date.now() + 1
        ).toString(),
        text: "That's awesome! 🚀",
        sender: "them",
      };

      setMessages((prev) => [
        ...prev,
        reply,
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) =>
          item.id
        }
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd(
            {
              animated: true,
            }
          )
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "me"
                ? styles.myBubble
                : styles.theirBubble,
            ]}
          >
            <Text
              style={{
                color:
                  item.sender === "me"
                    ? "white"
                    : "black",
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Message..."
          style={styles.input}
          multiline
        />

        <Pressable
          onPress={sendMessage}
        >
          <Text style={styles.send}>
            Send
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    bubble: {
      padding: 12,
      margin: 10,
      borderRadius: 20,
      maxWidth: "75%",
    },

    myBubble: {
      alignSelf: "flex-end",
      backgroundColor:
        "#3797EF",
      borderTopRightRadius: 5,
    },

    theirBubble: {
      alignSelf: "flex-start",
      backgroundColor:
        "#E5E5EA",
      borderTopLeftRadius: 5,
    },

    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderTopWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "white",
    },

    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      maxHeight: 100,
    },

    send: {
      color: "#3797EF",
      fontWeight: "bold",
      fontSize: 16,
    },
  });           