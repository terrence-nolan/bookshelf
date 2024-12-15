import React from "react";
import { SafeAreaView, View } from "react-native";

import { Book } from "@/components/Book";
import BookshelfHeader from "@/components/BookshelfHeader";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Books() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors[colorScheme ?? 'light'].background }} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
      >
        <BookshelfHeader />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
        </View>
      </View>
    </>
  );
}
