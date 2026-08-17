import React from 'react';
import { View, Text, Image } from 'react-native';
import { nativeColors } from '../tokens/theme';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

const sizes: Record<AvatarSize, number> = { sm: 24, md: 32, lg: 40, xl: 48 };
const fontSizes: Record<AvatarSize, number> = { sm: 10, md: 12, lg: 14, xl: 16 };
const dotSizes: Record<AvatarSize, number> = { sm: 6, md: 8, lg: 10, xl: 12 };

const statusColors: Record<AvatarStatus, string> = {
  online: nativeColors.green,
  offline: '#9ca3af',
  away: nativeColors.orange,
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  status,
}: AvatarProps) {
  const dim = sizes[size];
  const dotDim = dotSizes[size];
  const displayText = initials ? initials.slice(0, 2).toUpperCase() : alt.slice(0, 2).toUpperCase();

  return (
    <View style={{ width: dim, height: dim, position: 'relative' }}>
      <View
        style={{
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: `${nativeColors.accent}1a`,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {src ? (
          <Image source={{ uri: src }} style={{ width: dim, height: dim }} />
        ) : (
          <Text style={{ fontSize: fontSizes[size], fontWeight: '500', color: nativeColors.accent }}>
            {displayText}
          </Text>
        )}
      </View>
      {status && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: dotDim,
            height: dotDim,
            borderRadius: dotDim / 2,
            backgroundColor: statusColors[status],
            borderWidth: 2,
            borderColor: nativeColors.surface,
          }}
        />
      )}
    </View>
  );
}
