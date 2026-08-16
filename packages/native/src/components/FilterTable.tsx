import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { type FilterTableProps } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import { getBreakpoint } from '../utils/responsive';

export function FilterTable({ filters, data, columns, onFilterChange }: FilterTableProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(filters.filter((f) => f.active).map((f) => f.id)),
  );
  const { width } = useWindowDimensions();
  const bp = getBreakpoint(width);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onFilterChange?.(Array.from(next));
      return next;
    });
  };

  const filteredData = useMemo(() => {
    if (activeFilters.size === 0) return data;
    return data.filter((row) => activeFilters.has(String(row.status || row.type || '')));
  }, [data, activeFilters]);

  return (
    <View className="gap-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 px-1">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => toggleFilter(filter.id)}
              className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                borderWidth: 1,
                borderColor: activeFilters.has(filter.id) ? nativeColors.accent : nativeColors.line,
                backgroundColor: activeFilters.has(filter.id) ? nativeColors.accent + '1A' : nativeColors.surface,
              }}
            >
              <Text className="text-sm font-medium" style={{ color: activeFilters.has(filter.id) ? nativeColors.accent : nativeColors.ink2 }}>
                {filter.label}
              </Text>
              {filter.count !== undefined && (
                <View className="rounded-full px-1.5" style={{ backgroundColor: nativeColors.surfaceField }}>
                  <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{filter.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {bp === 'mobile' ? (
        <View className="gap-3">
          {filteredData.map((row, i) => (
            <View key={i} className="rounded-lg p-3" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
              {columns.map((col) => (
                <View key={col.key} className="flex-row justify-between py-0.5">
                  <Text className="text-xs" style={{ color: nativeColors.ink3 }}>{col.label}</Text>
                  <Text className="text-sm" style={{ color: nativeColors.ink }}>{String(row[col.key] ?? '')}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ) : (
        <ScrollView horizontal>
          <View className="overflow-hidden rounded-xl" style={{ borderWidth: 1, borderColor: nativeColors.line }}>
            <View className="flex-row" style={{ backgroundColor: nativeColors.surfaceField }}>
              {columns.map((col) => (
                <View key={col.key} className="px-4 py-3" style={{ width: 150 }}>
                  <Text className="text-xs font-semibold uppercase" style={{ color: nativeColors.ink3 }}>{col.label}</Text>
                </View>
              ))}
            </View>
            {filteredData.map((row, i) => (
              <View key={i} className="flex-row" style={{ borderTopWidth: 1, borderTopColor: nativeColors.line }}>
                {columns.map((col) => (
                  <View key={col.key} className="px-4 py-3" style={{ width: 150 }}>
                    <Text className="text-sm" style={{ color: nativeColors.ink }}>{String(row[col.key] ?? '')}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
