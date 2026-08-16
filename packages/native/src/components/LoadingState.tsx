import React from 'react';
import { View, Text } from 'react-native';
import { useTimer, type LoadingStateProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

function PixelGrid({ variant }: { variant: string }) {
  const gridSize = variant === 'drive' ? 16 : variant === 'dots' ? 9 : 12;
  const cols = variant === 'dots' ? 3 : 4;
  const pixels = Array.from({ length: gridSize }, (_, i) => i);

  return (
    <View className="flex-row flex-wrap gap-1" style={{ width: cols * 12 }}>
      {pixels.map((i) => (
        <View
          key={i}
          className="h-2 w-2 rounded-sm"
          style={{ backgroundColor: nativeColors.accent, opacity: 0.7 }}
        />
      ))}
    </View>
  );
}

export function LoadingState({ variant = 'drive', label, showTimer = true }: LoadingStateProps) {
  const { formatted } = useTimer(true);

  return (
    <View
      className="flex-col items-center gap-4 rounded-xl border p-6 sm:flex-row sm:gap-6 sm:p-8"
      style={{ borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
    >
      <PixelGrid variant={variant} />
      <View className="items-center gap-2 sm:items-start">
        <View className="h-2 w-24 rounded-full" style={{ backgroundColor: nativeColors.surfaceField }}>
          <View
            className="h-full rounded-full"
            style={{ backgroundColor: nativeColors.accent, width: '60%' }}
          />
        </View>
        {label && <Text className="text-sm" style={{ color: nativeColors.ink2 }}>{label}</Text>}
        {showTimer && <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{formatted}</Text>}
      </View>
    </View>
  );
}
