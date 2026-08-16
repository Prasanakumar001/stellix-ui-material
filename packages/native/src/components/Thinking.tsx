import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useExpandable, type ThinkingProps, type ThinkingStep } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

const traceIcons: Record<string, string> = {
  steps: '📋',
  reasoning: '🧠',
  search: '🔍',
  coding: '💻',
};

function TraceItem({ step }: { step: ThinkingStep }) {
  const { isOpen, toggle } = useExpandable(false);

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
      <TouchableOpacity
        onPress={toggle}
        className="flex-row items-center gap-3 px-4 py-3"
      >
        <Text className="text-sm">{traceIcons[step.type] || '•'}</Text>
        <Text className="flex-1 text-sm font-medium" style={{ color: nativeColors.ink }}>
          {step.type}
        </Text>
        {step.status === 'active' && (
          <View className="h-2 w-2 rounded-full" style={{ backgroundColor: nativeColors.accent }} />
        )}
        <Text style={{ color: nativeColors.ink3 }}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <Text className="px-6 pb-3 text-sm" style={{ color: nativeColors.ink2 }}>
          {step.content}
        </Text>
      )}
    </View>
  );
}

export function Thinking({ steps, defaultOpen = false }: ThinkingProps) {
  const { isOpen, toggle } = useExpandable(defaultOpen);

  return (
    <View
      className="overflow-hidden rounded-xl"
      style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
    >
      <TouchableOpacity
        onPress={toggle}
        className="flex-row items-center gap-2 px-4 py-3"
      >
        <Text className="text-sm">⚙️</Text>
        <Text className="flex-1 text-sm font-medium" style={{ color: nativeColors.ink }}>
          Thinking
        </Text>
        <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{steps.length} steps</Text>
      </TouchableOpacity>
      {isOpen &&
        steps.map((step) => <TraceItem key={step.id} step={step} />)}
    </View>
  );
}
