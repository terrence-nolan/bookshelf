import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { FunnelSimple, MagnifyingGlass, Plus, Timer, X } from "phosphor-react-native";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AddBookModal } from "./AddBookModal";
import { TimerModal } from "./TimerModal";

export default function BookshelfHeader() {
  // const [search, setSearch] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const [addBookModal, setAddBookModal] = useState<boolean>(false);
  const [timerModal, setTimerModal] = useState<boolean>(false);

  const toggleAddBookModal = () => {
    setAddBookModal(!addBookModal)
  }

  const toggleTimerModal = () => {
    setTimerModal(!timerModal)
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setTimerModal(true)}
        >
          <Timer size={28} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAddBookModal(true)}
        >
          <Plus size={28} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <TimerModal isVisible={timerModal} setIsVisible={toggleTimerModal} />
        <AddBookModal isVisible={addBookModal} setIsVisible={toggleAddBookModal} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: Colors[colorScheme ?? 'light'].text }]}>My Books</Text>
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
    fontSize: 24,
    fontWeight: '700',
  }
})
