import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { nativeColors } from '../tokens/theme';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
}

const rnSizes: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
  xl: 'large',
};

const labelSizes: Record<SpinnerSize, number> = { sm: 11, md: 13, lg: 13, xl: 15 };

export function Spinner({
  size = 'md',
  color,
  label,
}: SpinnerProps) {
  const spinnerColor = color || nativeColors.accent;

  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <ActivityIndicator size={rnSizes[size]} color={spinnerColor} />
      {label && (
        <Text style={{ fontSize: labelSizes[size], color: nativeColors.ink2 }}>{label}</Text>
      )}
    </View>
  );
}
