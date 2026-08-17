import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

function InboxIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.25 13.5h6.69a.75.75 0 01.66.41l.96 1.84a.75.75 0 00.66.41h1.56a.75.75 0 00.66-.41l.96-1.84a.75.75 0 01.66-.41h6.69M5.25 6.75L2.25 13.5v4.5A1.5 1.5 0 003.75 19.5h16.5a1.5 1.5 0 001.5-1.5V13.5L18.75 6.75"
        stroke={nativeColors.ink3}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x={5.25} y={3.75} width={13.5} height={3} rx={0.75} stroke={nativeColors.ink3} strokeWidth={1.5} />
    </Svg>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 16, paddingVertical: 64, paddingHorizontal: 24 }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: nativeColors.surfaceField,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon ?? <InboxIcon />}
      </View>
      <View style={{ alignItems: 'center', gap: 6, maxWidth: 280 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: nativeColors.ink, textAlign: 'center' }}>
          {title}
        </Text>
        {description && (
          <Text style={{ fontSize: 13, color: nativeColors.ink2, textAlign: 'center', lineHeight: 20 }}>
            {description}
          </Text>
        )}
      </View>
      {action && (
        <Pressable
          onPress={action.onClick}
          style={{
            marginTop: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: nativeColors.accent,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}
