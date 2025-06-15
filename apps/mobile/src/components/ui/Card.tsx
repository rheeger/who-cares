import React from 'react';
import { View, ViewProps } from 'react-native';
import { createCardStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';

type SurfaceVariant = 'primary' | 'secondary' | 'glass';
type ShadowVariant = 'flat' | 'elevated' | 'floating';

interface CardProps extends ViewProps {
  variant?: SurfaceVariant;
  shadow?: ShadowVariant;
  children: React.ReactNode;
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginLeft?: SpacingKey;
  marginRight?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
}

const cardStyles = createCardStyles();

export const Card: React.FC<CardProps> = ({
  variant = 'secondary',
  shadow = 'elevated',
  children,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  style,
  ...props
}) => {
  const spacingStyles = [
    margin && createSpacingStyle('margin', margin),
    marginTop && createSpacingStyle('margin', marginTop, 'top'),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom'),
    marginLeft && createSpacingStyle('margin', marginLeft, 'left'),
    marginRight && createSpacingStyle('margin', marginRight, 'right'),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal'),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical'),
  ].filter(Boolean);

  const combinedStyle = combineStyles(
    cardStyles.base,
    cardStyles[variant],
    cardStyles[shadow],
    ...spacingStyles,
    style
  );

  return (
    <View style={combinedStyle} {...props}>
      {children}
    </View>
  );
}; 