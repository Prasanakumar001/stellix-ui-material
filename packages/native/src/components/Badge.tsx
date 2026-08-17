import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  success: { bg: '#dcfce7', text: '#166534', dot: nativeColors.green },
  warning: { bg: '#fef9c3', text: '#854d0e', dot: nativeColors.orange },
  error: { bg: '#fee2e2', text: '#991b1b', dot: nativeColors.red },
  info: { bg: '#dbeafe', text: '#1e40af', dot: nativeColors.blue },
  neutral: { bg: nativeColors.surfaceField, text: nativeColors.ink2, dot: nativeColors.ink3 },
};

export function Badge({
  variant = 'neutral',
  dot = false,
  removable = false,
  onRemove,
  children,
}: BadgeProps) {
  const colors = variantColors[variant];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: colors.bg,
        alignSelf: 'flex-start',
      }}
    >
      {dot && (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.dot }} />
      )}
      <Text style={{ fontSize: 12, fontWeight: '500', color: colors.text }}>
        {children}
      </Text>
      {removable && (
        <Pressable onPress={onRemove} style={{ marginLeft: 2 }}>
          <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
            <Path d="M6 18L18 6M6 6l12 12" stroke={colors.text} strokeWidth={2.5} strokeLinecap="round" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
}
