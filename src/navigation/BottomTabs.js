import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CreateScreen from "../screens/CreateScreen";
import ReelsScreen from "../screens/ReelsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    
      <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,

    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Search") {
        iconName = focused ? "search" : "search-outline";
      } else if (route.name === "Create") {
        iconName = focused ? "add-circle" : "add-circle-outline";
      } else if (route.name === "Reels") {
        iconName = focused ? "play-circle" : "play-circle-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      }

      return (
        <Ionicons
          name={iconName}
          size={28}
          color={color}
        />
      );
    },

    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "gray",
  })}
>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
        />

        <Tab.Screen
          name="Create"
          component={CreateScreen}
        />

        <Tab.Screen
          name="Reels"
          component={ReelsScreen}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    
  );
}