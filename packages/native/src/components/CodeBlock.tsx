import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useCodeStream, type CodeBlockProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import * as Clipboard from 'expo-clipboard';

export function CodeBlock({
  code,
  language = 'typescript',
  streaming = false,
  showLineNumbers = true,
  onCopy,
}: CodeBlockProps) {
  const { displayedLines, isComplete } = useCodeStream(code, streaming ? 60 : 0);
  const [copied, setCopied] = useState(false);

  const lines = streaming ? displayedLines : code.split('\n');

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(code);
    } catch {
      // Clipboard not available
    }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View className="overflow-hidden rounded-xl" style={{ backgroundColor: '#1e1e1e' }}>
      <View className="flex-row items-center justify-between px-4 py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' }}>
        <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{language}</Text>
        <TouchableOpacity onPress={handleCopy} className="rounded px-2 py-1">
          <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{copied ? '✓ Copied' : 'Copy'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal className="p-4">
        <View>
          {lines.map((line, i) => (
            <View key={i} className="flex-row">
              {showLineNumbers && (
                <Text className="mr-4 w-8 text-right text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {i + 1}
                </Text>
              )}
              <Text className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>{line}</Text>
            </View>
          ))}
          {streaming && !isComplete && (
            <Text style={{ color: nativeColors.accent }}>▎</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
