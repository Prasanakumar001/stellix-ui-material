import React from 'react';
import { View } from 'react-native';
import { nativeColors } from '../tokens/theme';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

interface SkeletonBlockProps {
  variant?: SkeletonVariant;
  lines?: number;
  width?: number | string;
  height?: number | string;
}

const shimmerBg = nativeColors.surfaceField;
const lineWidths = ['100%', '80%', '92%', '75%', '85%'] as const;

function SkeletonLine({ index, last }: { index: number; last: boolean }) {
  return (
    <View
      style={{
        height: 12,
        borderRadius: 4,
        backgroundColor: shimmerBg,
        width: last ? '66%' : lineWidths[index % lineWidths.length],
      }}
    />
  );
}

export function SkeletonBlock({
  variant = 'rectangle',
  lines = 3,
  width,
  height,
}: SkeletonBlockProps) {
  if (variant === 'text') {
    return (
      <View style={{ gap: 8, width: width as any }}>
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonLine key={i} index={i} last={i === lines - 1} />
        ))}
      </View>
    );
  }

  if (variant === 'circle') {
    const dim = (width as number) || 48;
    return (
      <View
        style={{
          width: dim,
          height: (height as number) || dim,
          borderRadius: dim / 2,
          backgroundColor: shimmerBg,
        }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <View
        style={{
          borderRadius: 12,
          borderWidth: 1,
          borderColor: nativeColors.line,
          padding: 16,
          gap: 12,
          width: width as any,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: shimmerBg }} />
          <View style={{ flex: 1, gap: 6 }}>
            <View style={{ height: 12, borderRadius: 4, backgroundColor: shimmerBg, width: '66%' }} />
            <View style={{ height: 10, borderRadius: 4, backgroundColor: shimmerBg, width: '33%' }} />
          </View>
        </View>
        <View style={{ gap: 8 }}>
          {Array.from({ length: 3 }, (_, i) => (
            <View
              key={i}
              style={{
                height: 12,
                borderRadius: 4,
                backgroundColor: shimmerBg,
                width: lineWidths[i % lineWidths.length],
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  // rectangle
  return (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: shimmerBg,
        width: (width as any) || '100%',
        height: (height as number) || 96,
      }}
    />
  );
}
