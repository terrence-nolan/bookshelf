import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FunnelSimple, MagnifyingGlass, Plus, X } from "phosphor-react-native";
import ContextMenu from "react-native-context-menu-view";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BookshelfHeader() {
  const [search, setSearch] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  return (
    <>
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
      <ContextMenu
        actions={[{ title: 'Finished' }, { title: 'Unfinished' }]}
      >
        <FunnelSimple size={28} color={Colors[colorScheme ?? 'light'].text} />
      </ContextMenu>
      <Plus size={28} color={Colors[colorScheme ?? 'light'].text} />
    </View>
    <View style={styles.headerContainer}>
      <Text style={[styles.header, { color: Colors[colorScheme ?? 'light'].text }]}>My Bookshelf</Text>
    </View>
    </>
  )
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
