import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { type TaskRowsProps, type TaskItem } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';

const statusColors: Record<string, string> = {
  running: nativeColors.blue,
  completed: nativeColors.green,
  failed: nativeColors.red,
  queued: nativeColors.ink3,
};

function TaskRow({ task, expandable }: { task: TaskItem; expandable: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: nativeColors.line }}>
      <TouchableOpacity
        onPress={expandable ? () => setIsOpen(!isOpen) : undefined}
        className="flex-row items-center gap-3 px-4 py-3"
      >
        <Text className="flex-1 text-sm font-medium" style={{ color: nativeColors.ink }}>{task.title}</Text>
        {task.progress !== undefined && (
          <View className="h-1.5 w-16 overflow-hidden rounded-full" style={{ backgroundColor: nativeColors.surfaceField }}>
            <View className="h-full rounded-full" style={{ backgroundColor: nativeColors.accent, width: `${task.progress}%` }} />
          </View>
        )}
        <View
          className="rounded-full px-2 py-0.5"
          style={{ backgroundColor: statusColors[task.status] + '1A', borderWidth: 1, borderColor: statusColors[task.status] + '4D' }}
        >
          <Text className="text-xs font-medium" style={{ color: statusColors[task.status] }}>{task.status}</Text>
        </View>
      </TouchableOpacity>
      {expandable && isOpen && task.description && (
        <Text className="px-4 pb-3 text-sm" style={{ color: nativeColors.ink2 }}>{task.description}</Text>
      )}
    </View>
  );
}

export function TaskRows({ tasks, expandable = true }: TaskRowsProps) {
  return (
    <View
      className="overflow-hidden rounded-xl"
      style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface, ...require('../tokens/theme').nativeShadows.card }}
    >
      {tasks.map((task) => <TaskRow key={task.id} task={task} expandable={expandable} />)}
    </View>
  );
}
