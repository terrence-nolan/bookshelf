import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowCounterClockwise, Check, Pause, Pencil, Play } from 'phosphor-react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface TimerProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

interface TimerLog {
  id: string;
  startTime: string;
  endTime?: string;
  duration: number;
}

export function TimerModal({ isVisible, setIsVisible }: TimerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [totalLoggedTime, setTotalLoggedTime] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

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

  const formatGoal = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs > 0 && mins !== 0) {
      return `${hrs} hour and${mins > 0 ? ` ${mins} minute` : ''}`;
    } else if (hrs > 0 && mins == 0) {
      return `${hrs} hour`;
    }
    return `${mins} minute`;
  };

  return (
    <Modal
      key={isVisible ? 'visible' : 'hidden'}
      visible={isVisible}
      animationType='slide'
      onRequestClose={() => setIsVisible()}
      onDismiss={() => bottomSheetRef.current?.close()}
    >
      {/* might need to change flex-1 to style={{ flex: 1 }} */}
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row w-full justify-between pb-2 border-b">
            <TouchableOpacity onPress={() => setIsVisible()}>
              <Text className="text-xl pl-5">Close</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View className="flex-1 flex-col justify-center items-center px-5">
            <View className='items-center'>
              <Text className="text-8xl font-bold mb-5">{formatTime(elapsedTime)}</Text>
              <Text className="text-lg mb-10">of my {formatGoal(dailyGoal)} goal</Text>

              <View className="flex-row gap-10">
                <TouchableOpacity
                  onPress={handleStartStop}
                  className={`p-4 rounded-full ${isRunning ? 'bg-stone-950' : 'bg-stone-950'}`}
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

            {/* Adjust Goal Button */}
            <View className='absolute bottom-5 left-0 right-0 items-center'>
              <TouchableOpacity
                className='bg-stone-950 py-4 px-6 rounded-full'
                onPress={openBottomSheet}
              >
                <Text className='text-stone-50 font-medium text-lg'>Adjust My Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['33%']}
          enablePanDownToClose={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />
          )}
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
              {Array.from({ length: 1440 }, (_, i) => i + 1).map((value) => (
                <Picker.Item
                  label={`${value.toString()} ${value === 1 ? 'minute' : 'minutes'}`}
                  value={value.toString()}
                  key={value}
                />
              ))}
            </Picker>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </Modal>
  );
}
