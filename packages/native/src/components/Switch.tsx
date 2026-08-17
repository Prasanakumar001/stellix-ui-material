import React from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { nativeColors } from '../tokens/theme';

type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: SwitchSize;
  disabled?: boolean;
}

const trackDims: Record<SwitchSize, { w: number; h: number }> = {
  sm: { w: 28, h: 16 },
  md: { w: 36, h: 20 },
  lg: { w: 44, h: 24 },
};

const thumbDims: Record<SwitchSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function Switch({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
}: SwitchProps) {
  const track = trackDims[size];
  const thumb = thumbDims[size];
  const travel = track.w - thumb - 4;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, opacity: disabled ? 0.5 : 1 }}>
      <Pressable
        onPress={() => !disabled && onChange(!checked)}
        disabled={disabled}
        style={{
          width: track.w,
          height: track.h,
          borderRadius: track.h / 2,
          backgroundColor: checked ? nativeColors.accent : nativeColors.line,
          justifyContent: 'center',
          paddingHorizontal: 2,
          marginTop: 2,
        }}
      >
        <View
          style={{
            width: thumb,
            height: thumb,
            borderRadius: thumb / 2,
            backgroundColor: '#fff',
            transform: [{ translateX: checked ? travel : 0 }],
          }}
        />
      </Pressable>
      {(label || description) && (
        <View style={{ flex: 1, gap: 2 }}>
          {label && <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>}
          {description && <Text style={{ fontSize: 11, color: nativeColors.ink3 }}>{description}</Text>}
        </View>
      )}
    </View>
  );
}
