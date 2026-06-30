import React, { useState } from "react";
import { FlatList } from "react-native";
import { reels } from "../data/reels";
import ReelItem from "../components/reels/ReelItem";

export default function ReelsScreen() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  return (
    <FlatList
      data={reels}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ReelItem
          item={item}
          isActive={index === activeIndex}
        />
      )}
      onViewableItemsChanged={
        onViewableItemsChanged
      }
      viewabilityConfig={viewabilityConfig}
    />
  );
}