import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { type RecommendationCardProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

function ConfidenceMeter({ value }: { value: number }) {
  const segments = 5;
  const filled = Math.round((value / 100) * segments);

  return (
    <View className="flex-row items-center gap-1">
      {Array.from({ length: segments }, (_, i) => (
        <View
          key={i}
          className="h-2 rounded-sm"
          style={{ width: 18, backgroundColor: i < filled ? nativeColors.accent : nativeColors.surfaceField }}
        />
      ))}
      <Text className="ml-2 text-xs font-medium" style={{ color: nativeColors.ink2 }}>{value}%</Text>
    </View>
  );
}

export function RecommendationCard({
  title, description, confidence, alternatives = [], onAccept, onReject, onModify,
}: RecommendationCardProps) {
  return (
    <View className="rounded-xl p-4 sm:p-6" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
      <View className="gap-3 sm:flex-row sm:items-start sm:justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold" style={{ color: nativeColors.ink }}>{title}</Text>
          <Text className="mt-1 text-sm" style={{ color: nativeColors.ink2 }}>{description}</Text>
        </View>
        <ConfidenceMeter value={confidence} />
      </View>

      {alternatives.length > 0 && (
        <View className="mt-4 gap-2">
          <Text className="text-xs font-medium uppercase" style={{ color: nativeColors.ink3 }}>Alternatives</Text>
          {alternatives.map((alt) => (
            <View key={alt.id} className="flex-row items-center justify-between rounded-lg px-3 py-2" style={{ backgroundColor: nativeColors.surfaceField }}>
              <Text className="text-sm" style={{ color: nativeColors.ink }}>{alt.label}</Text>
              <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{alt.confidence}%</Text>
            </View>
          ))}
        </View>
      )}

      <View className="mt-4 flex-row gap-2 sm:justify-end">
        <TouchableOpacity onPress={onReject} className="flex-1 items-center rounded-lg px-3 py-2 sm:flex-none" style={{ borderWidth: 1, borderColor: nativeColors.line }}>
          <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onModify} className="flex-1 items-center rounded-lg px-3 py-2 sm:flex-none" style={{ borderWidth: 1, borderColor: nativeColors.accent + '4D' }}>
          <Text className="text-sm font-medium" style={{ color: nativeColors.accent }}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAccept} className="flex-1 items-center rounded-lg px-3 py-2 sm:flex-none" style={{ backgroundColor: nativeColors.accent }}>
          <Text className="text-sm font-medium text-white">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
