import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

interface TagProps {
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Tag({
  color,
  removable = false,
  onRemove,
  icon,
  children,
}: TagProps) {
  const isCustom = color && color !== 'accent';
  const bgColor = isCustom ? `${color}1a` : `${nativeColors.accent}1a`;
  const textColor = isCustom ? color : nativeColors.accent;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: bgColor,
        alignSelf: 'flex-start',
      }}
    >
      {icon && <View>{icon}</View>}
      <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>
        {children}
      </Text>
      {removable && (
        <Pressable onPress={onRemove} style={{ marginLeft: 2 }}>
          <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
            <Path d="M6 18L18 6M6 6l12 12" stroke={textColor} strokeWidth={2.5} strokeLinecap="round" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
}
