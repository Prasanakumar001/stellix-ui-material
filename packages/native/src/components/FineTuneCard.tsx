import React from 'react';
import { View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { type FineTuneCardProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function FineTuneCard({ title, properties, onChange }: FineTuneCardProps) {
  return (
    <View className="rounded-xl p-4 sm:p-6" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
      <Text className="text-sm font-semibold uppercase tracking-wide" style={{ color: nativeColors.ink }}>{title}</Text>
      <View className="mt-4 gap-4">
        {properties.map((prop) => (
          <View key={prop.id} className="gap-1.5">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm" style={{ color: nativeColors.ink2 }}>{prop.label}</Text>
              {prop.type === 'slider' && (
                <Text className="text-xs" style={{ color: nativeColors.ink3, fontFamily: 'monospace' }}>{String(prop.value)}</Text>
              )}
            </View>

            {prop.type === 'slider' && (
              <Slider
                value={Number(prop.value)}
                minimumValue={prop.min ?? 0}
                maximumValue={prop.max ?? 100}
                step={prop.step ?? 1}
                onValueChange={(v) => onChange?.(prop.id, v)}
                minimumTrackTintColor={nativeColors.accent}
                maximumTrackTintColor={nativeColors.line}
                thumbTintColor={nativeColors.accent}
              />
            )}

            {prop.type === 'toggle' && (
              <Switch
                value={Boolean(prop.value)}
                onValueChange={(v) => onChange?.(prop.id, v)}
                trackColor={{ false: nativeColors.lineStrong, true: nativeColors.accent + '80' }}
                thumbColor={prop.value ? nativeColors.accent : nativeColors.surfaceField}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
