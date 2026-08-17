import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { nativeColors } from '../tokens/theme';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
}: ToggleProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, opacity: disabled ? 0.5 : 1 }}>
      <Pressable
        onPress={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: checked ? nativeColors.accent : nativeColors.surfaceField,
          justifyContent: 'center',
          paddingHorizontal: 2,
          marginTop: 2,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            transform: [{ translateX: checked ? 20 : 0 }],
          }}
        />
      </Pressable>
      {(label || description) && (
        <View style={{ flex: 1, gap: 2 }}>
          {label && <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>}
          {description && <Text style={{ fontSize: 11, color: nativeColors.ink3, marginTop: 1 }}>{description}</Text>}
        </View>
      )}
    </View>
  );
}
