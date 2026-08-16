import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { type ChatProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function Chat({ messages, onSend, tabs = [] }: ChatProps) {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View
        className="flex-1 overflow-hidden rounded-xl"
        style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
      >
        {tabs.length > 0 && (
          <View className="flex-row" style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className="px-4 py-2.5">
                <Text
                  className="text-sm font-medium"
                  style={{ color: activeTab === tab ? nativeColors.accent : nativeColors.ink3 }}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ScrollView ref={scrollRef} className="flex-1 p-4" contentContainerStyle={{ gap: 16 }}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={msg.role === 'user' ? 'items-end' : 'items-start'}
            >
              <View
                className="max-w-[85%] rounded-xl px-4 py-2.5"
                style={{
                  backgroundColor: msg.role === 'user' ? nativeColors.accent : nativeColors.surfaceField,
                }}
              >
                <Text
                  className="text-sm"
                  style={{ color: msg.role === 'user' ? '#ffffff' : nativeColors.ink }}
                >
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View
          className="flex-row gap-2 p-3"
          style={{ borderTopWidth: 1, borderTopColor: nativeColors.line }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={nativeColors.ink3}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
            style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surfaceField, color: nativeColors.ink }}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim()}
            className="items-center justify-center rounded-lg px-4 py-2"
            style={{ backgroundColor: input.trim() ? nativeColors.accent : nativeColors.accent + '80' }}
          >
            <Text className="text-sm font-medium text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
