import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { nativeColors } from '../tokens/theme';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

export function Radio({ options, value, onChange }: RadioProps) {
  return (
    <View style={{ gap: 12 }}>
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                borderWidth: 2,
                borderColor: isSelected ? nativeColors.accent : nativeColors.line,
                backgroundColor: isSelected ? 'transparent' : nativeColors.surfaceField,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
              }}
            >
              {isSelected && (
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: nativeColors.accent }} />
              )}
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: isSelected ? nativeColors.accent : nativeColors.ink }}>
                {opt.label}
              </Text>
              {opt.description && (
                <Text style={{ fontSize: 11, color: nativeColors.ink3 }}>{opt.description}</Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
