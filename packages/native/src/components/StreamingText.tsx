import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useStreamingText, type StreamingTextProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function StreamingText({
  text,
  citations = [],
  followUps = [],
  speed = 30,
  onComplete,
}: StreamingTextProps) {
  const { displayed, isComplete } = useStreamingText(text, speed);

  useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete, onComplete]);

  return (
    <View className="gap-4">
      <Text className="text-sm leading-relaxed sm:text-base" style={{ color: nativeColors.ink }}>
        {displayed}
        {!isComplete && <Text style={{ color: nativeColors.accent }}>▎</Text>}
      </Text>

      {citations.length > 0 && isComplete && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          <View className="flex-row gap-2">
            {citations.map((citation) => (
              <View
                key={citation.id}
                className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
                style={{ backgroundColor: nativeColors.surfaceField, borderWidth: 1, borderColor: nativeColors.line }}
              >
                <Text className="text-xs" style={{ color: nativeColors.ink3 }}>[{citation.id}]</Text>
                <Text className="text-xs font-medium" style={{ color: nativeColors.accent }}>{citation.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {followUps.length > 0 && isComplete && (
        <View className="gap-2">
          {followUps.map((followUp, i) => (
            <TouchableOpacity
              key={i}
              className="rounded-lg px-3 py-2"
              style={{ borderWidth: 1, borderColor: nativeColors.line }}
            >
              <Text className="text-sm" style={{ color: nativeColors.ink }}>{followUp}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
