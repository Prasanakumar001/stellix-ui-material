import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { nativeColors } from '../tokens/theme';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  maxLength?: number;
  error?: string;
  rows?: number;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  error,
  rows = 3,
}: TextareaProps) {
  const hasError = Boolean(error);
  const [height, setHeight] = useState<number | undefined>(undefined);

  return (
    <View style={{ gap: 4 }}>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={nativeColors.ink3}
        multiline
        numberOfLines={rows}
        maxLength={maxLength}
        onContentSizeChange={(e) => setHeight(Math.max(rows * 20, e.nativeEvent.contentSize.height))}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: hasError ? nativeColors.red : nativeColors.line,
          backgroundColor: nativeColors.surfaceField,
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 14,
          color: nativeColors.ink,
          textAlignVertical: 'top',
          minHeight: rows * 20,
          height,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {hasError ? (
          <Text style={{ fontSize: 11, color: nativeColors.red }}>{error}</Text>
        ) : (
          <View />
        )}
        {maxLength !== undefined && (
          <Text style={{ fontSize: 11, color: value.length >= maxLength ? nativeColors.red : nativeColors.ink3 }}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
