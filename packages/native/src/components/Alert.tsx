import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const variantColors: Record<AlertVariant, { border: string; bg: string; title: string; icon: string }> = {
  info: { border: nativeColors.blue, bg: '#eff6ff', title: '#1e40af', icon: nativeColors.blue },
  success: { border: nativeColors.green, bg: '#f0fdf4', title: '#166534', icon: nativeColors.green },
  warning: { border: nativeColors.orange, bg: '#fefce8', title: '#854d0e', icon: nativeColors.orange },
  error: { border: nativeColors.red, bg: '#fef2f2', title: '#991b1b', icon: nativeColors.red },
};

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const color = variantColors[variant].icon;
  if (variant === 'success') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <SvgCircle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
        <Path d="M8 12l2.5 2.5L16 9" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  if (variant === 'warning') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  if (variant === 'error') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <SvgCircle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
        <Path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
      <Path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
  const colors = variantColors[variant];

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.border,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: colors.bg,
        padding: 16,
      }}
    >
      <View style={{ marginTop: 2 }}>
        {icon ?? <AlertIcon variant={variant} />}
      </View>
      <View style={{ flex: 1 }}>
        {title && (
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.title }}>{title}</Text>
        )}
        {children && (
          <Text style={{ fontSize: 13, color: nativeColors.ink2, marginTop: title ? 4 : 0 }}>
            {typeof children === 'string' ? children : ''}
          </Text>
        )}
      </View>
      {dismissible && onDismiss && (
        <Pressable onPress={onDismiss}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M6 18L18 6M6 6l12 12" stroke={nativeColors.ink3} strokeWidth={1.5} strokeLinecap="round" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
}
