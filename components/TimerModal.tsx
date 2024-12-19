import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { Picker } from '@react-native-picker/picker';
import { ArrowCounterClockwise, Check, CheckCircle, Pause, Play } from 'phosphor-react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { pickerOptions } from '@/constants/pickerOptions';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ModalHeader } from './ModalHeader';

interface TimerProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

// interface TimerLog {
//   id: string;
//   startTime: string;
//   endTime?: string;
//   duration: number;
// }

export function TimerModal({ isVisible, setIsVisible }: TimerProps) {
  const { top, bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const blurTint = colorScheme === 'dark' ? 'systemThickMaterialDark' : 'systemThickMaterialLight';
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [totalLoggedTime, setTotalLoggedTime] = useState<number>(0);
  const [totalLoggedMinutes, setTotalLoggedMinutes] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(1);
  // const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // useEffect(() => {
  //   setProgressBarWidth(() => {
  //     const progress = Math.min(totalLoggedTime, dailyGoal * 60);
  //     console.log('>>>>>>> progress:', progress);
  //     return Math.max((progress / (dailyGoal * 60)) * 100, 7);
  //   });
  // }, [totalLoggedTime, dailyGoal]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    else if (mins > 9) {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(new Date());
      setIsRunning(true);
    }
  };

  const handleLog = () => {
    if (!isRunning && elapsedTime > 0) {
      setTotalLoggedTime((prev) => prev + elapsedTime);
      setTotalLoggedMinutes((prev) => (prev + elapsedTime) / 60);
      setElapsedTime(0);
      setStartTime(null);
    }
  };

  const handleClear = () => {
    if (elapsedTime > 0) {
      setIsRunning(false);
      setElapsedTime(0);
      setStartTime(null);
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  // const formatGoal = (minutes: number) => {
  //   const hrs = Math.floor(minutes / 60);
  //   const mins = minutes % 60;

  //   if (hrs > 0 && mins !== 0) {
  //     return `${hrs} hour and${mins > 0 ? ` ${mins} minute` : ''}`;
  //   } else if (hrs > 0 && mins == 0) {
  //     return `${hrs} hour`;
  //   }
  //   return `${mins} minute`;
  // };

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={() => setIsVisible()}
      onDismiss={() => bottomSheetRef.current?.close()}
    >
      <BlurView className='flex-1' tint={blurTint} intensity={75}>
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex-1">
          <View className="flex-1">
            <ModalHeader setIsVisible={setIsVisible} headerText='Close' />

            {/* {true ? (
              <View className='flex-row items-center gap-1 mt-10 self-center'>
                <CheckCircle size={16} color={'#16a34a'} weight='fill' />
                <Text className='text-base'>You have completed your {dailyGoal} minute goal!</Text>
              </View>
            ) : (
              <View className='flex flex-col gap-4 items-center mt-10'>
                <Text className='text-base'>You have read for {Math.floor(totalLoggedMinutes)} {Math.floor(totalLoggedMinutes) === 1 ? 'minute' : 'minutes'} of your {dailyGoal} minute goal.</Text>
                <View className='bg-stone-300 h-2 w-10/12 rounded-full'>
                  <View style={{ width: `${progressBarWidth}%` }} className='bg-green-600 h-2 rounded-full' />
                </View>
              </View>
            )} */}

            <View className="flex-1 flex-col justify-center items-center px-5">
              <View className='items-center'>
                <Text className="text-8xl font-bold text-stone-950">{formatTime(elapsedTime)}</Text>
                <Text className='text-lg mb-10 text-stone-950'>{elapsedTime === 0 && !isRunning ? `Start a new session.` : `elapsed in this session.`}</Text>

                <View className="flex-row gap-10">
                  <TouchableOpacity
                    onPress={handleStartStop}
                    className={`p-4 rounded-full bg-stone-950`}
                  >
                    {isRunning ? <Pause size={28} color='white' /> : <Play size={28} color='white' />}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLog}
                    className={`p-4 rounded-full ${!isRunning && elapsedTime > 0 ? 'bg-stone-950' : 'bg-stone-300'}`}
                    disabled={isRunning || elapsedTime === 0}
                  >
                    <Check size={28} color='white' />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleClear}
                    className={`p-4 rounded-full ${!isRunning && elapsedTime > 0 ? 'bg-stone-950' : 'bg-stone-300'}`}
                    disabled={isRunning || elapsedTime === 0}
                  >
                    <ArrowCounterClockwise size={28} color='white' />
                  </TouchableOpacity>
                </View>
              </View>

              <View className='absolute bottom-5 left-0 right-0 items-center'>
                <TouchableOpacity
                  className='bg-stone-950 py-4 px-6 rounded-full'
                  onPress={openBottomSheet}
                >
                  <Text className='text-stone-50 font-medium text-lg'>Adjust Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

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
                onValueChange={(value) => {
                  setDailyGoal(Number(value));
                  // setProgressBarWidth(() => {
                  //   const progress = Math.min(totalLoggedTime, Number(value) * 60);
                  //   console.log('>>>>>>> progress:', progress);
                  //   return Math.max((progress / (Number(value) * 60)) * 100, 7);
                  // });
                }}
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
        </View>
      </BlurView>
    </Modal>
  );
}
