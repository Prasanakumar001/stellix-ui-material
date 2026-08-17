import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { nativeColors } from '../tokens/theme';

type Orientation = 'horizontal' | 'vertical';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep?: number;
  orientation?: Orientation;
}

function StepCircle({ index, state }: { index: number; state: 'completed' | 'active' | 'upcoming' }) {
  const size = 28;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: state === 'completed' ? nativeColors.accent : nativeColors.surface,
        borderWidth: state === 'upcoming' ? 2 : state === 'active' ? 2 : 0,
        borderColor: state === 'active' ? nativeColors.accent : nativeColors.line,
      }}
    >
      {state === 'completed' ? (
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path d="M4.5 12.75l6 6 9-13.5" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      ) : (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: state === 'active' ? nativeColors.accent : nativeColors.ink3,
          }}
        >
          {index + 1}
        </Text>
      )}
    </View>
  );
}

export function StepIndicator({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
}: StepIndicatorProps) {
  const getState = (i: number) => {
    if (i < currentStep) return 'completed' as const;
    if (i === currentStep) return 'active' as const;
    return 'upcoming' as const;
  };

  if (orientation === 'vertical') {
    return (
      <View style={{ gap: 0 }}>
        {steps.map((step, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <StepCircle index={i} state={getState(i)} />
              {i < steps.length - 1 && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    marginVertical: 4,
                    backgroundColor: i < currentStep ? nativeColors.accent : nativeColors.line,
                  }}
                />
              )}
            </View>
            <View style={{ paddingBottom: i < steps.length - 1 ? 24 : 0, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: getState(i) === 'upcoming' ? nativeColors.ink3 : nativeColors.ink,
                }}
              >
                {step.label}
              </Text>
              {step.description && (
                <Text style={{ fontSize: 11, color: nativeColors.ink2, marginTop: 2 }}>
                  {step.description}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  }

  // horizontal
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {steps.map((step, i) => (
        <View key={i} style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {i > 0 && (
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: i <= currentStep ? nativeColors.accent : nativeColors.line,
                }}
              />
            )}
            <StepCircle index={i} state={getState(i)} />
            {i < steps.length - 1 && (
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: i < currentStep ? nativeColors.accent : nativeColors.line,
                }}
              />
            )}
          </View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: getState(i) === 'upcoming' ? nativeColors.ink3 : nativeColors.ink,
              textAlign: 'center',
              marginTop: 8,
              paddingHorizontal: 4,
            }}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
