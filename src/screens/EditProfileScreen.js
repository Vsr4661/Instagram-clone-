import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
    const { profile, setProfile } = useContext(ProfileContext);
  const [name, setName] = useState(profile.name);
const [username, setUsername] = useState(profile.username);
const [bio, setBio] = useState(profile.bio);

  const handleSave = () => {
  setProfile({
    name,
    username,
    bio,
  });

  navigation.goBack();
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Name
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>
        Username
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Text style={styles.label}>
        Bio
      </Text>

      <TextInput
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
      />

      <Pressable
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  label: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },

  button: {
    backgroundColor: "#0095f6",
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});