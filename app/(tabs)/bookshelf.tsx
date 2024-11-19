import React from "react";
import { SafeAreaView, View } from "react-native";

import { Book } from "@/components/Book";
import BookshelfHeader from "@/components/BookshelfHeader";

export default function Index() {

  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
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
