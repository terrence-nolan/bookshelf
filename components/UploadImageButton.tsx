import React, { useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Swap, UploadSimple } from 'phosphor-react-native';

export default function UploadImageButton() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1.5, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <>
      <Text className='text-xl font-medium'>Cover Image</Text>
        {image && <Image source={{ uri: image }} className='h-60 w-40 rounded my-1' />}
        <TouchableOpacity
          className='flex-row items-center justify-center gap-2 bg-stone-50 border border-stone-300 rounded-xl p-3 mt-1 mb-5'
          onPress={pickImage}
        >
          {image ? <Swap size={18} weight='bold' /> : <UploadSimple size={18} weight='bold' />}
          <Text className='text-lg font-medium'>{image ? 'Change' : 'Upload'}</Text>
        </TouchableOpacity>
    </>
  );
}
