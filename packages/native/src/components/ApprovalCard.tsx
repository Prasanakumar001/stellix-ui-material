import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { type ApprovalCardProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function ApprovalCard({
  title,
  description,
  options,
  type = 'radio',
  allowCustom = false,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState('');

  const handleToggle = (id: string) => {
    if (type === 'radio') {
      setSelected([id]);
    } else {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
      );
    }
  };

  return (
    <View
      className="rounded-xl p-4 sm:p-6"
      style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface, ...require('../tokens/theme').nativeShadows.card }}
    >
      <Text className="text-base font-semibold sm:text-lg" style={{ color: nativeColors.ink }}>{title}</Text>
      {description && <Text className="mt-1 text-sm" style={{ color: nativeColors.ink2 }}>{description}</Text>}

      <View className="mt-4 gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleToggle(option.id)}
            className="flex-row items-start gap-3 rounded-lg p-3"
            style={{
              borderWidth: 1,
              borderColor: selected.includes(option.id) ? nativeColors.accent : nativeColors.line,
              backgroundColor: selected.includes(option.id) ? nativeColors.accent + '0D' : 'transparent',
            }}
          >
            <View
              className="mt-0.5 h-4 w-4 items-center justify-center rounded-full"
              style={{ borderWidth: 2, borderColor: selected.includes(option.id) ? nativeColors.accent : nativeColors.ink3 }}
            >
              {selected.includes(option.id) && (
                <View className="h-2 w-2 rounded-full" style={{ backgroundColor: nativeColors.accent }} />
              )}
            </View>
            <View>
              <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>{option.label}</Text>
              {option.description && (
                <Text className="mt-0.5 text-xs" style={{ color: nativeColors.ink2 }}>{option.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {allowCustom && (
        <TextInput
          value={customValue}
          onChangeText={setCustomValue}
          placeholder="Custom response..."
          placeholderTextColor={nativeColors.ink3}
          className="mt-3 rounded-lg px-3 py-2 text-sm"
          style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surfaceField, color: nativeColors.ink }}
        />
      )}

      <View className="mt-4 flex-row gap-2 sm:justify-end">
        <TouchableOpacity
          onPress={onReject}
          className="flex-1 items-center rounded-lg px-4 py-2 sm:flex-none"
          style={{ borderWidth: 1, borderColor: nativeColors.line }}
        >
          <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onApprove?.(selected)}
          disabled={selected.length === 0 && !customValue}
          className="flex-1 items-center rounded-lg px-4 py-2 sm:flex-none"
          style={{ backgroundColor: selected.length > 0 || customValue ? nativeColors.accent : nativeColors.accent + '80' }}
        >
          <Text className="text-sm font-medium text-white">Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
