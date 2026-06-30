 import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import EditProfileScreen from "../screens/EditProfileScreen";
import StoryViewerScreen from "../screens/StoryViewerScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Bottom Tabs */}
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        {/* Edit Profile */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
          }}
        />

        {/* Stories */}
        <Stack.Screen
          name="StoryViewer"
          component={StoryViewerScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* DMs */}
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            title: "Messages",
          }}
        />

        {/* Chat Screen */}
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title:
              route.params?.chat
                ?.username || "Chat",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}