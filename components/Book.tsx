import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BookProps {
  cover: ImageSourcePropType;
  title: string;
  author: string;
}

export function Book({ cover, title, author }: BookProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.bookContainer}>
      <Image source={cover} style={styles.bookCover}/>
      <View>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>{title}</Text>
      </View>
      <View>
        <Text style={[styles.author, { color: Colors[colorScheme ?? 'light'].text }]}>{author}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  bookContainer: {
    padding: 8,
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 4,
    paddingBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  author: {
    fontSize: 14,
    fontWeight: 'medium',
  }
})
