import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import { pickerOptions } from '@/constants/pickerOptions';

interface AdjustGoalBottomsheetProps {
  openBottomSheet: () => void;
}

export default function AdjustGoalBottomsheet({ openBottomSheet }: AdjustGoalBottomsheetProps) {
  const [dailyGoal, setDailyGoal] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['33%']}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
    >
      <BottomSheetView
        className="bg-white p-5 flex-col justify-center items-center"
      >
        <Text className="text-xl font-medium">Set Daily Goal</Text>
        <Picker
          selectedValue={dailyGoal.toString()}
          onValueChange={(value) => setDailyGoal(Number(value))}
          style={{ height: 50, width: '100%' }}
        >
          {pickerOptions.map((value) => (
            <Picker.Item
              label={`${value.toString()} min/day`}
              value={value.toString()}
              key={value}
            />
          ))}
        </Picker>
      </BottomSheetView>
    </BottomSheet>    
  );
}
