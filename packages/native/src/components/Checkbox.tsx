import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

function CheckIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
      <Path d="M4.5 12.75l6 6 9-13.5" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MinusIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" />
    </Svg>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  indeterminate = false,
  disabled = false,
}: CheckboxProps) {
  const isActive = checked || indeterminate;

  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: isActive ? nativeColors.accent : nativeColors.line,
          backgroundColor: isActive ? nativeColors.accent : nativeColors.surfaceField,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {indeterminate ? <MinusIcon /> : checked ? <CheckIcon /> : null}
      </View>
      {(label || description) && (
        <View style={{ flex: 1, gap: 2 }}>
          {label && <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>}
          {description && <Text style={{ fontSize: 11, color: nativeColors.ink3 }}>{description}</Text>}
        </View>
      )}
    </Pressable>
  );
}
