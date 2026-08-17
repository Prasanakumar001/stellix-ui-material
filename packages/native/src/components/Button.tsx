import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { cn } from '@stellix/ui-core';
import { nativeColors, nativeShadows } from '../tokens/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

const variantColors: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: nativeColors.accent, text: '#fff' },
  secondary: { bg: nativeColors.surfaceField, text: nativeColors.ink },
  ghost: { bg: 'transparent', text: nativeColors.ink },
  destructive: { bg: nativeColors.red, text: '#fff' },
  outline: { bg: 'transparent', text: nativeColors.ink, border: nativeColors.line },
};

const sizeStyles: Record<ButtonSize, { px: number; py: number; fontSize: number }> = {
  sm: { px: 12, py: 6, fontSize: 13 },
  md: { px: 16, py: 8, fontSize: 15 },
  lg: { px: 24, py: 12, fontSize: 17 },
};

const spinnerSizes: Record<ButtonSize, number> = { sm: 14, md: 18, lg: 22 };

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const colors = variantColors[variant];
  const sizing = sizeStyles[size];

  return (
    <Pressable
      onPress={onClick}
      disabled={isDisabled}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 8,
        paddingHorizontal: sizing.px,
        paddingVertical: sizing.py,
        backgroundColor: colors.bg,
        borderWidth: colors.border ? 1 : 0,
        borderColor: colors.border,
        opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} style={{ width: spinnerSizes[size], height: spinnerSizes[size] }} />
      ) : icon ? (
        <View>{icon}</View>
      ) : null}
      {children && (
        <Text style={{ color: colors.text, fontSize: sizing.fontSize, fontWeight: '600' }}>
          {typeof children === 'string' ? children : ''}
        </Text>
      )}
    </Pressable>
  );
}
