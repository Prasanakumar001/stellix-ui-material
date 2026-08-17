import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { nativeColors, nativeShadows } from '../tokens/theme';

export type DonutSegment = { label: string; value: number; color: string };

export type DonutChartProps = {
  segments: DonutSegment[];
  centerLabel: string;
};

export function DonutChart({ segments, centerLabel }: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = segments.reduce((s, g) => s + g.value, 0);
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 54;
  const innerR = 34;
  const stroke = r - innerR;
  const circumference = 2 * Math.PI * (r - stroke / 2);

  let cumulative = 0;
  const arcs = segments.map((seg, i) => {
    const pct = total > 0 ? seg.value / total : 0;
    const dashArray = circumference * pct;
    const dashOffset = -(circumference * cumulative);
    const arc = { ...seg, pct, dashArray, dashOffset, idx: i };
    cumulative += pct;
    return arc;
  });

  const hoveredSeg = hovered !== null ? segments[hovered] : null;

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: nativeColors.line,
        backgroundColor: nativeColors.surface,
        padding: 16,
        maxWidth: 320,
        alignSelf: 'center',
        ...nativeShadows.card,
      }}
    >
      {/* SVG donut */}
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
          {total === 0 && (
            <Circle
              cx={cx}
              cy={cy}
              r={r - stroke / 2}
              fill="none"
              stroke={nativeColors.surfaceField}
              strokeWidth={stroke}
            />
          )}
          {arcs.map((arc) => (
            <Circle
              key={arc.idx}
              cx={cx}
              cy={cy}
              r={r - stroke / 2}
              fill="none"
              stroke={arc.color}
              strokeWidth={hovered === arc.idx ? stroke + 4 : stroke}
              strokeDasharray={`${arc.dashArray} ${circumference}`}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="round"
            />
          ))}
        </Svg>
        {/* Center label */}
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          {hoveredSeg ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: '700', color: nativeColors.ink }}>
                {Math.round((hoveredSeg.value / (total || 1)) * 100)}%
              </Text>
              <Text style={{ fontSize: 10, color: nativeColors.ink3, textAlign: 'center', maxWidth: 60 }}>
                {hoveredSeg.label}
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 12, fontWeight: '600', color: nativeColors.ink, textAlign: 'center' }}>
              {centerLabel}
            </Text>
          )}
        </View>
      </View>

      {/* Legend */}
      <View style={{ gap: 8, width: '100%' }}>
        {segments.map((seg, i) => {
          const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
          return (
            <Pressable
              key={i}
              onPressIn={() => setHovered(i)}
              onPressOut={() => setHovered(null)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: hovered === i ? nativeColors.surfaceField : 'transparent',
              }}
            >
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: seg.color }} />
              <Text style={{ flex: 1, fontSize: 12, color: nativeColors.ink }}>{seg.label}</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: nativeColors.ink2 }}>{pct}%</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
