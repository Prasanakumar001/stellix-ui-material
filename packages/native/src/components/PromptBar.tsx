import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { type PromptBarProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function PromptBar({
  placeholder = 'Ask anything...',
  sources = [],
  commands = [],
  models = [],
  onSubmit,
}: PromptBarProps) {
  const [value, setValue] = useState('');
  const [showSources, setShowSources] = useState(false);
  const [showCommands, setShowCommands] = useState(false);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value.trim());
      setValue('');
    }
  };

  return (
    <View>
      <View
        className="rounded-xl"
        style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={nativeColors.ink3}
          multiline
          className="px-4 pt-3 pb-2 text-sm"
          style={{ color: nativeColors.ink, minHeight: 44 }}
          onSubmitEditing={handleSubmit}
        />

        <View
          className="flex-row items-center gap-2 px-3 py-2"
          style={{ borderTopWidth: 1, borderTopColor: nativeColors.line }}
        >
          <TouchableOpacity
            onPress={() => setShowSources(true)}
            className="rounded-md px-2 py-1"
          >
            <Text className="text-xs" style={{ color: nativeColors.ink3 }}>@ Sources</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCommands(true)}
            className="rounded-md px-2 py-1"
          >
            <Text className="text-xs" style={{ color: nativeColors.ink3 }}>/ Commands</Text>
          </TouchableOpacity>
          <View className="flex-1" />
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!value.trim()}
            className="rounded-lg px-3 py-1.5"
            style={{ backgroundColor: value.trim() ? nativeColors.accent : nativeColors.accent + '80' }}
          >
            <Text className="text-xs font-medium text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sources Bottom Sheet */}
      <Modal visible={showSources} transparent animationType="slide">
        <TouchableOpacity className="flex-1" onPress={() => setShowSources(false)} />
        <View className="rounded-t-xl p-4" style={{ backgroundColor: nativeColors.surface, borderTopWidth: 1, borderTopColor: nativeColors.line }}>
          <Text className="mb-3 text-sm font-semibold" style={{ color: nativeColors.ink }}>Sources</Text>
          {sources.map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => { setValue((v) => v + '@' + s.name + ' '); setShowSources(false); }}
              className="flex-row items-center gap-2 rounded-lg px-3 py-3"
            >
              <Text>{s.icon || '📄'}</Text>
              <Text className="text-sm" style={{ color: nativeColors.ink }}>{s.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Commands Bottom Sheet */}
      <Modal visible={showCommands} transparent animationType="slide">
        <TouchableOpacity className="flex-1" onPress={() => setShowCommands(false)} />
        <View className="rounded-t-xl p-4" style={{ backgroundColor: nativeColors.surface, borderTopWidth: 1, borderTopColor: nativeColors.line }}>
          <Text className="mb-3 text-sm font-semibold" style={{ color: nativeColors.ink }}>Commands</Text>
          {commands.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => { setValue('/' + c.name + ' '); setShowCommands(false); }}
              className="flex-row items-center justify-between rounded-lg px-3 py-3"
            >
              <Text className="text-sm" style={{ color: nativeColors.ink }}>/{c.name}</Text>
              {c.description && <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{c.description}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}
