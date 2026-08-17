import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { nativeColors } from '../tokens/theme';

type TooltipPlacement = 'top' | 'bottom';

interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
}

export function Tooltip({
  content,
  placement = 'top',
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <Pressable
        onLongPress={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
        delayLongPress={300}
      >
        {children}
      </Pressable>
      {visible && (
        <View
          style={{
            position: 'absolute',
            left: '50%',
            transform: [{ translateX: -60 }],
            ...(placement === 'top' ? { bottom: '100%', marginBottom: 8 } : { top: '100%', marginTop: 8 }),
            backgroundColor: '#374151',
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 4,
            width: 120,
            alignItems: 'center',
            zIndex: 50,
          }}
        >
          <Text style={{ fontSize: 11, color: '#fff', textAlign: 'center' }}>{content}</Text>
        </View>
      )}
    </View>
  );
}
