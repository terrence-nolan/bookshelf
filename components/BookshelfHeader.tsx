import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { FunnelSimple, MagnifyingGlass, Plus, Timer, X } from "phosphor-react-native";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AddBookModal } from "./AddBookModal";

export default function BookshelfHeader() {
  // const [search, setSearch] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  const toggleAddModal = () => {
    setAddModal(!addModal)
  }

  return (
    <>
    <View style={styles.buttonContainer}>
      {/* {search && (
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
      <FunnelSimple size={28} color={Colors[colorScheme ?? 'light'].text} /> */}
      <TouchableOpacity>
        <Timer size={28} color={Colors[colorScheme ?? 'light'].text} weight="bold" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAddModal(true)}
      >
        <Plus size={28} color={Colors[colorScheme ?? 'light'].text}  weight="bold"/>
      </TouchableOpacity>
      <AddBookModal isVisible={addModal} setIsVisible={toggleAddModal} />
    </View>
    <View style={styles.headerContainer}>
      <Text style={[styles.header, { color: Colors[colorScheme ?? 'light'].text }]}>My Books</Text>
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
