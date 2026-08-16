import React from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { type InsightCardsProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import { getBreakpoint, responsiveValue } from '../utils/responsive';
import Svg, { Polyline } from 'react-native-svg';

function MiniChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const width = 180;
  const height = 56;
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * width},${height - (d.value / maxValue) * height}`)
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Polyline
        points={points}
        fill="none"
        stroke={nativeColors.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InsightCards({ insights }: InsightCardsProps) {
  const { width } = useWindowDimensions();
  const bp = getBreakpoint(width);
  const cardWidth = responsiveValue(bp, { mobile: width - 64, tablet: (width - 64) / 2, web: (width - 80) / 3, bigScreen: (width - 96) / 4 });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}>
      {insights.map((insight) => (
        <View
          key={insight.id}
          className="rounded-xl p-4"
          style={{ width: cardWidth, borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
        >
          <Text className="text-sm font-semibold" style={{ color: nativeColors.ink }}>{insight.title}</Text>
          {insight.description && <Text className="mt-1 text-xs" style={{ color: nativeColors.ink2 }}>{insight.description}</Text>}
          <View className="mt-3">
            <MiniChart data={insight.data} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
