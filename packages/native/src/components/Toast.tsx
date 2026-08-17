import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';
import { nativeColors, nativeShadows } from '../tokens/theme';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message: string;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  autoDismiss?: number;
}

const variantColors: Record<ToastVariant, { border: string; bg: string; icon: string }> = {
  success: { border: nativeColors.green, bg: '#f0fdf4', icon: nativeColors.green },
  error: { border: nativeColors.red, bg: '#fef2f2', icon: nativeColors.red },
  warning: { border: nativeColors.orange, bg: '#fefce8', icon: nativeColors.orange },
  info: { border: nativeColors.blue, bg: '#eff6ff', icon: nativeColors.blue },
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const color = variantColors[variant].icon;
  if (variant === 'success') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <SvgCircle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
        <Path d="M8 12l2.5 2.5L16 9" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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
  if (variant === 'warning') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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

export function Toast({
  variant = 'info',
  title,
  message,
  onDismiss,
  action,
  autoDismiss,
}: ToastProps) {
  const colors = variantColors[variant];

  useEffect(() => {
    if (!autoDismiss || !onDismiss) return;
    const timer = setTimeout(onDismiss, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: colors.border,
        backgroundColor: colors.bg,
        padding: 16,
        width: 320,
        ...nativeShadows.raised,
      }}
    >
      <ToastIcon variant={variant} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: nativeColors.ink }}>{title}</Text>
        <Text style={{ fontSize: 13, color: nativeColors.ink2, marginTop: 2 }}>{message}</Text>
        {action && (
          <Pressable onPress={action.onClick} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: colors.icon, textDecorationLine: 'underline' }}>
              {action.label}
            </Text>
          </Pressable>
        )}
      </View>
      {onDismiss && (
        <Pressable onPress={onDismiss}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M6 18L18 6M6 6l12 12" stroke={nativeColors.ink3} strokeWidth={1.5} strokeLinecap="round" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
}
