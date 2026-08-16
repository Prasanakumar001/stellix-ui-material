import React from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useSortable, type RecordsTableProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import { getBreakpoint } from '../utils/responsive';
import { TouchableOpacity } from 'react-native';

export function RecordsTable({ columns, data, selectable = false, onSort }: RecordsTableProps) {
  const { sortedData, sortKey, sortDirection, sort } = useSortable(data);
  const { width } = useWindowDimensions();
  const bp = getBreakpoint(width);

  // Mobile: Card layout
  if (bp === 'mobile') {
    return (
      <View className="gap-3">
        {sortedData.map((row) => (
          <View
            key={String(row.id)}
            className="rounded-xl p-4"
            style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}
          >
            {columns.map((col) => (
              <View key={col.key} className="flex-row justify-between py-1">
                <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{col.label}</Text>
                <Text className="text-sm" style={{ color: nativeColors.ink }}>{String(row[col.key] ?? '')}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  // Tablet+: Table layout
  return (
    <View className="overflow-hidden rounded-xl" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
      <ScrollView horizontal>
        <View>
          <View className="flex-row" style={{ backgroundColor: nativeColors.surfaceField, borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
            {columns.map((col) => (
              <TouchableOpacity
                key={col.key}
                onPress={() => col.sortable && sort(col.key)}
                className="px-4 py-3"
                style={{ width: 150 }}
              >
                <Text className="text-xs font-semibold uppercase" style={{ color: nativeColors.ink3 }}>
                  {col.label} {sortKey === col.key && (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {sortedData.map((row) => (
            <View key={String(row.id)} className="flex-row" style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
              {columns.map((col) => (
                <View key={col.key} className="px-4 py-3" style={{ width: 150 }}>
                  <Text className="text-sm" style={{ color: nativeColors.ink }}>{String(row[col.key] ?? '')}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
