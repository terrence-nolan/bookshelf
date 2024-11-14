import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FunnelSimple, Plus, MagnifyingGlass, X } from "phosphor-react-native";

import { Book } from "@/components/Book";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.buttonContainer}>
          {search && (
            <>
              <TouchableOpacity
                onPress={() => setSearch(false)}
              >
                <X size={28} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search"
                style={{
                  flex: 1,
                  height: 28,
                  borderWidth: 1.5,
                  padding: 4,
                  borderRadius: 4,
                  borderColor: Colors[colorScheme ?? 'light'].text,
                  color: Colors[colorScheme ?? 'light'].text,
                }}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => setSearch(true)}
          >
            <MagnifyingGlass size={28} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <FunnelSimple size={28} color={Colors[colorScheme ?? 'light'].text} />
          <Plus size={28} color={Colors[colorScheme ?? 'light'].text} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Bookshelf</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
          <Book title="The Hobbit" author="J.R.R. Tolkien" cover={require('@/assets/images/hobbit-cover.jpg')} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
  }
})
