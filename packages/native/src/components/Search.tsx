import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { type SearchProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function Search({
  results = [],
  placeholder = 'Search...',
  onSearch,
  onSelect,
  recentSearches = [],
}: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="flex-row items-center gap-2 rounded-lg px-3 py-2"
        style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surfaceField }}
      >
        <Text style={{ color: nativeColors.ink3 }}>🔍</Text>
        <Text className="text-sm" style={{ color: nativeColors.ink3 }}>{placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity className="flex-1 justify-start pt-20" onPress={() => setIsOpen(false)} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} activeOpacity={1}>
          <View className="mx-4 rounded-xl" style={{ backgroundColor: nativeColors.surface, borderWidth: 1, borderColor: nativeColors.line }} onStartShouldSetResponder={() => true}>
            <View className="flex-row items-center px-4" style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
              <Text style={{ color: nativeColors.ink3 }}>🔍</Text>
              <TextInput
                ref={inputRef}
                value={query}
                onChangeText={(v) => { setQuery(v); onSearch?.(v); }}
                placeholder={placeholder}
                placeholderTextColor={nativeColors.ink3}
                className="flex-1 px-3 py-4 text-sm"
                style={{ color: nativeColors.ink }}
              />
            </View>
            <ScrollView className="max-h-80 p-2">
              {results.length > 0 ? (
                results.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    onPress={() => { onSelect?.(result); setIsOpen(false); }}
                    className="flex-row items-center gap-3 rounded-lg px-3 py-2"
                  >
                    {result.icon && <Text>{result.icon}</Text>}
                    <View className="flex-1">
                      <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>{result.title}</Text>
                      {result.description && <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{result.description}</Text>}
                    </View>
                  </TouchableOpacity>
                ))
              ) : query ? (
                <View className="items-center py-8">
                  <Text className="text-sm" style={{ color: nativeColors.ink3 }}>No results for "{query}"</Text>
                </View>
              ) : recentSearches.length > 0 ? (
                <>
                  <Text className="px-3 py-1 text-xs font-medium uppercase" style={{ color: nativeColors.ink3 }}>Recent</Text>
                  {recentSearches.map((term, i) => (
                    <TouchableOpacity key={i} onPress={() => { setQuery(term); onSearch?.(term); }} className="flex-row items-center gap-2 rounded-lg px-3 py-2">
                      <Text style={{ color: nativeColors.ink3 }}>↩</Text>
                      <Text className="text-sm" style={{ color: nativeColors.ink2 }}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <View className="items-center py-8">
                  <Text className="text-sm" style={{ color: nativeColors.ink3 }}>Start typing to search...</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
