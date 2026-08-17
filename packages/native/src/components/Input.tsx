import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { nativeColors } from '../tokens/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  prefixIcon,
  suffixIcon,
  disabled = false,
  type = 'text',
}: InputProps) {
  const hasError = Boolean(error);
  const keyboardType = type === 'email' ? 'email-address' as const : type === 'number' ? 'numeric' as const : 'default' as const;

  return (
    <View style={{ gap: 4 }}>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: hasError ? nativeColors.red : nativeColors.line,
          backgroundColor: nativeColors.surfaceField,
          paddingHorizontal: 12,
          paddingVertical: 8,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {prefixIcon && <View>{prefixIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={nativeColors.ink3}
          editable={!disabled}
          secureTextEntry={type === 'password'}
          keyboardType={keyboardType}
          style={{ flex: 1, fontSize: 14, color: nativeColors.ink, padding: 0 }}
        />
        {suffixIcon && <View>{suffixIcon}</View>}
      </View>
      {hasError && (
        <Text style={{ fontSize: 11, color: nativeColors.red }}>{error}</Text>
      )}
      {!hasError && helperText && (
        <Text style={{ fontSize: 11, color: nativeColors.ink3 }}>{helperText}</Text>
      )}
    </View>
  );
}
