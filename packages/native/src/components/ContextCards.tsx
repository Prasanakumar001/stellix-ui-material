import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { truncate, type ContextCardsProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import { getBreakpoint, responsiveValue } from '../utils/responsive';

export function ContextCards({ chunks }: ContextCardsProps) {
  const { width } = useWindowDimensions();
  const bp = getBreakpoint(width);
  const columns = responsiveValue(bp, { mobile: 1, tablet: 2, web: 3, bigScreen: 4 });
  const cardWidth = (width - 32 - (columns - 1) * 16) / columns;

  return (
    <View className="flex-row flex-wrap gap-4 px-4">
      {chunks.map((chunk) => (
        <ContextCardItem key={chunk.id} chunk={chunk} width={cardWidth} />
      ))}
    </View>
  );
}

function ContextCardItem({ chunk, width }: { chunk: ContextCardsProps['chunks'][0]; width: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{ width, borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface, borderRadius: 12, padding: 16 }}
    >
      <View className="flex-row items-start gap-2">
        <Text className="text-lg">{chunk.icon || '📄'}</Text>
        <View className="flex-1">
          <Text className="text-sm font-semibold" numberOfLines={1} style={{ color: nativeColors.ink }}>{chunk.title}</Text>
          <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{chunk.source}</Text>
        </View>
        {chunk.relevance !== undefined && (
          <View className="rounded-full px-2 py-0.5" style={{ backgroundColor: nativeColors.accent + '1A' }}>
            <Text className="text-xs font-medium" style={{ color: nativeColors.accent }}>{chunk.relevance}%</Text>
          </View>
        )}
      </View>
      <Text className="mt-2 text-sm" style={{ color: nativeColors.ink2 }}>
        {expanded ? chunk.content : truncate(chunk.content, 120)}
      </Text>
      {chunk.content.length > 120 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text className="mt-1 text-xs font-medium" style={{ color: nativeColors.accent }}>
            {expanded ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
