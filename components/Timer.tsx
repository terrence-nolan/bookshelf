import React, { ArrowCounterClockwise, Check, Pause, Play } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TimerProps {
  isRunning: boolean;
  setIsRunning: (state: boolean) => void;
  elapsedTime: number;
  setElapsedTime: (time: number | ((prev: number) => number)) => void;
  setStartTime: (time: Date | null) => void;
  handleStartStop: () => void;
}

export function Timer({
  isRunning,
  setIsRunning,
  elapsedTime,
  setElapsedTime,
  setStartTime,
  handleStartStop,
}: TimerProps) {
  const [totalLoggedSeconds, setTotalLoggedSeconds] = useState<number>(0);
  const [totalLoggedMinutes, setTotalLoggedMinutes] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev: number) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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

  const handleLog = () => {
    if (!isRunning && elapsedTime > 0) {
      setTotalLoggedSeconds((prev) => prev + elapsedTime);
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

  return (
    <View className='items-center'>
      <Text className="text-8xl font-bold text-stone-950">{formatTime(elapsedTime)}</Text>
      <Text className='text-lg mb-10 text-stone-950'>{elapsedTime === 0 && !isRunning ? `Start a new session.` : `elapsed in this session.`}</Text>

      <View className="flex-row gap-10">
        <TouchableOpacity
          onPress={handleStartStop}
          className={`p-4 rounded-full bg-stone-950`}
        >
          {isRunning ? <Pause size={28} color='white' weight="fill" /> : <Play size={28} color='white' weight="fill" />}
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
  );
}
