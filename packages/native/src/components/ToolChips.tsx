import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { type ToolChipsProps, type ToolCall } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

function StatusIcon({ status }: { status: ToolCall['status'] }) {
  if (status === 'running') return <Text style={{ color: nativeColors.blue }}>⟳</Text>;
  if (status === 'success') return <Text style={{ color: nativeColors.green }}>✓</Text>;
  return <Text style={{ color: nativeColors.red }}>✗</Text>;
}

function ToolChip({ tool }: { tool: ToolCall }) {
  const [expanded, setExpanded] = useState(false);
  const bgColor = tool.status === 'success' ? nativeColors.green + '0D' : tool.status === 'running' ? nativeColors.blue + '0D' : nativeColors.red + '0D';
  const borderColor = tool.status === 'success' ? nativeColors.green + '4D' : tool.status === 'running' ? nativeColors.blue + '4D' : nativeColors.red + '4D';

  return (
    <View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="flex-row items-center gap-2 rounded-lg px-3 py-1.5"
        style={{ backgroundColor: bgColor, borderWidth: 1, borderColor }}
      >
        <StatusIcon status={tool.status} />
        <Text className="text-sm font-medium" style={{ color: nativeColors.ink }}>{tool.name}</Text>
        {tool.file && <Text className="text-sm" style={{ color: nativeColors.ink3 }}>· {tool.file}</Text>}
      </TouchableOpacity>
      {expanded && tool.summary && (
        <View className="mt-2 rounded-lg p-3" style={{ backgroundColor: nativeColors.surfaceField, borderWidth: 1, borderColor: nativeColors.line }}>
          <Text className="text-sm" style={{ color: nativeColors.ink2 }}>{tool.summary}</Text>
          {(tool.additions || tool.deletions) && (
            <View className="mt-1 flex-row gap-2">
              {tool.additions && <Text className="text-xs" style={{ color: nativeColors.green }}>+{tool.additions}</Text>}
              {tool.deletions && <Text className="text-xs" style={{ color: nativeColors.red }}>-{tool.deletions}</Text>}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export function ToolChips({ tools }: ToolChipsProps) {
  return (
    <View className="gap-2 sm:flex-row sm:flex-wrap">
      {tools.map((tool) => <ToolChip key={tool.id} tool={tool} />)}
    </View>
  );
}
