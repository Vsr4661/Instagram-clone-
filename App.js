import RootNavigator from "./src/navigation/RootNavigator";
import { ProfileProvider } from "./src/context/ProfileContext";
import { PostProvider } from "./src/context/PostContext";

export default function App() {
  return (
    <ProfileProvider>
  <PostProvider>
    <RootNavigator />
  </PostProvider>
</ProfileProvider>
  );
}