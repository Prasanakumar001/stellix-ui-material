import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { type SelectionActionsProps, type SelectionAction } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

const defaultActions: SelectionAction[] = ['rewrite', 'summarize', 'explain', 'translate'];

const actionLabels: Record<string, string> = {
  rewrite: '✏️ Rewrite',
  summarize: '📝 Summarize',
  explain: '💡 Explain',
  translate: '🌐 Translate',
};

// Note: React Native doesn't support native text selection detection like web.
// This component renders a toolbar that can be shown/hidden by the parent.
export function SelectionActions({
  actions = defaultActions,
  onAction,
  selectedText = '',
  visible = false,
}: SelectionActionsProps & { selectedText?: string; visible?: boolean }) {
  if (!visible) return null;

  return (
    <View
      className="flex-row flex-wrap gap-2 rounded-xl p-3"
      style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
    >
      {actions.map((action) => (
        <TouchableOpacity
          key={action}
          onPress={() => onAction?.(action, selectedText)}
          className="flex-1 items-center rounded-lg px-3 py-2.5"
          style={{ borderWidth: 1, borderColor: nativeColors.line, minWidth: 100 }}
        >
          <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>
            {actionLabels[action] || action}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
