import { FlatList } from "react-native";

import Header from "../components/Header";
import StoryList from "../components/StoryList";
import PostItem from "../components/post/PostItem";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";


export default function HomeScreen() {
    const { posts } = useContext(PostContext);
  return (
   <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostItem item={item} />
      )}
      ListHeaderComponent={
        <>
          <Header />
          <StoryList />
        </>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}