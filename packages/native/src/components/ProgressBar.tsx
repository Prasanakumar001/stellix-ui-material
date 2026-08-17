import React from 'react';
import { View, Text } from 'react-native';
import { nativeColors } from '../tokens/theme';

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: string;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
}

const trackHeights: Record<ProgressSize, number> = { sm: 6, md: 10, lg: 16 };

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color,
  label,
  showValue = false,
  indeterminate = false,
}: ProgressBarProps) {
  const pct = indeterminate ? 40 : Math.min(100, Math.max(0, (value / max) * 100));
  const displayPct = Math.round((value / max) * 100);
  const fillColor = color || nativeColors.accent;
  const h = trackHeights[size];

  return (
    <View style={{ width: '100%' }}>
      {(label || showValue) && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          {label && <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink2 }}>{label}</Text>}
          {showValue && !indeterminate && (
            <Text style={{ fontSize: 12, color: nativeColors.ink3 }}>{displayPct}%</Text>
          )}
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: h,
          borderRadius: h / 2,
          backgroundColor: nativeColors.surfaceField,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: h / 2,
            backgroundColor: fillColor,
          }}
        />
      </View>
    </View>
  );
}
