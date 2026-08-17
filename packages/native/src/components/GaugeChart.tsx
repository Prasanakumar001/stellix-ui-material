import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Line, Circle as SvgCircle } from 'react-native-svg';
import { nativeColors, nativeShadows } from '../tokens/theme';

export type GaugeChartProps = {
  value: number;
  max: number;
  label: string;
  unit?: string;
};

export function GaugeChart({ value, max, label, unit = '' }: GaugeChartProps) {
  const pct = Math.min(Math.max(value / (max || 1), 0), 1);

  const R = 60;
  const stroke = 10;
  const W = 200;
  const H = 120;
  const cx = W / 2;
  const cy = H - 15;

  const leftX = cx - R;
  const rightX = cx + R;

  const trackPath = `M ${leftX} ${cy} A ${R} ${R} 0 0 1 ${rightX} ${cy}`;

  const angle = Math.PI * (1 - pct);
  const fillEndX = cx + R * Math.cos(angle);
  const fillEndY = cy - R * Math.sin(angle);
  const fillPath = `M ${leftX} ${cy} A ${R} ${R} 0 0 1 ${fillEndX} ${fillEndY}`;

  const needleLen = R - stroke - 6;
  const tipX = cx + needleLen * Math.cos(angle);
  const tipY = cy - needleLen * Math.sin(angle);

  const color = pct >= 0.75 ? nativeColors.red : pct >= 0.5 ? nativeColors.orange : pct >= 0.25 ? nativeColors.orange : nativeColors.green;

  return (
    <View
      style={{
        alignItems: 'center',
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
      <Text style={{ fontSize: 13, fontWeight: '600', color: nativeColors.ink, marginBottom: 8 }}>{label}</Text>
      <Svg width={200} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Track */}
        <Path d={trackPath} fill="none" stroke={nativeColors.line} strokeWidth={stroke} strokeLinecap="round" />
        {/* Fill */}
        {pct > 0.01 && (
          <Path d={fillPath} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
        )}
        {/* Needle */}
        <Line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke={color} strokeWidth={2} strokeLinecap="round" />
        {/* Center dot */}
        <SvgCircle cx={cx} cy={cy} r={4} fill={nativeColors.surface} stroke={color} strokeWidth={2} />
      </Svg>
      <Text style={{ fontSize: 24, fontWeight: '700', color, marginTop: 4 }}>
        {value}{unit}
      </Text>
      <Text style={{ fontSize: 11, color: nativeColors.ink3 }}>
        {Math.round(pct * 100)}% of {max}
      </Text>
    </View>
  );
}
