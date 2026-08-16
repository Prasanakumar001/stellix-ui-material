import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { type DiffTableProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

export function DiffTable({ hunks, onAccept, onReject }: DiffTableProps) {
  return (
    <View className="overflow-hidden rounded-xl" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
      <ScrollView horizontal>
        <View>
          {hunks.map((hunk) => (
            <View key={hunk.id}>
              {hunk.lines.map((line, i) => (
                <View
                  key={`${hunk.id}-${i}`}
                  className="flex-row px-3 py-0.5"
                  style={{
                    backgroundColor: line.type === 'add' ? nativeColors.green + '0D' : line.type === 'remove' ? nativeColors.red + '0D' : 'transparent',
                  }}
                >
                  <Text className="w-8 text-right text-xs" style={{ color: nativeColors.ink3, fontFamily: 'monospace' }}>
                    {line.oldLineNumber ?? ''}
                  </Text>
                  <Text className="w-8 text-right text-xs" style={{ color: nativeColors.ink3, fontFamily: 'monospace' }}>
                    {line.newLineNumber ?? ''}
                  </Text>
                  <Text className="w-4 text-center text-xs" style={{ fontFamily: 'monospace' }}>
                    {line.type === 'add' ? <Text style={{ color: nativeColors.green }}>+</Text> : line.type === 'remove' ? <Text style={{ color: nativeColors.red }}>-</Text> : ' '}
                  </Text>
                  <Text className="text-sm" style={{ color: nativeColors.ink, fontFamily: 'monospace' }}>{line.content}</Text>
                </View>
              ))}
              {(onAccept || onReject) && (
                <View className="flex-row justify-end gap-2 px-3 py-2" style={{ borderTopWidth: 1, borderTopColor: nativeColors.line }}>
                  {onReject && (
                    <TouchableOpacity onPress={() => onReject(hunk.id)} className="rounded px-2 py-1">
                      <Text className="text-xs" style={{ color: nativeColors.red }}>Reject</Text>
                    </TouchableOpacity>
                  )}
                  {onAccept && (
                    <TouchableOpacity onPress={() => onAccept(hunk.id)} className="rounded px-2 py-1">
                      <Text className="text-xs" style={{ color: nativeColors.green }}>Accept</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
