import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { nativeColors, nativeShadows } from '../tokens/theme';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}

function ChevronIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke={nativeColors.ink3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M4.5 12.75l6 6 9-13.5" stroke={nativeColors.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <View style={{ gap: 4 }}>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '500', color: nativeColors.ink }}>{label}</Text>
      )}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: nativeColors.line,
          backgroundColor: nativeColors.surfaceField,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 14, color: selected ? nativeColors.ink : nativeColors.ink3 }}>
          {selected ? selected.label : placeholder}
        </Text>
        <ChevronIcon />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => { setOpen(false); setSearch(''); }}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', paddingHorizontal: 32 }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: nativeColors.surface,
              borderRadius: 12,
              maxHeight: 400,
              ...nativeShadows.overlay,
            }}
          >
            {searchable && (
              <View style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line, paddingHorizontal: 12, paddingVertical: 10 }}>
                <TextInput
                  autoFocus
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Filter..."
                  placeholderTextColor={nativeColors.ink3}
                  style={{ fontSize: 14, color: nativeColors.ink, padding: 0 }}
                />
              </View>
            )}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => { onChange(item.value); setOpen(false); setSearch(''); }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: item.value === value ? `${nativeColors.accent}1a` : 'transparent',
                  }}
                >
                  <Text style={{ fontSize: 14, color: item.value === value ? nativeColors.accent : nativeColors.ink }}>
                    {item.label}
                  </Text>
                  {item.value === value && <CheckIcon />}
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={{ padding: 16, textAlign: 'center', fontSize: 14, color: nativeColors.ink3 }}>
                  No options found
                </Text>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
