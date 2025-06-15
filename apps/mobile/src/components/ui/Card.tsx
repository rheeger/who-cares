import React from 'react';
import { View, ViewProps } from 'react-native';
import { createCardStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { useTheme } from '../ThemeContext';

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
  const { currentTheme } = useTheme();
  const cardStyles = createCardStyles(currentTheme);
  
  const spacingStyles = [
    margin && createSpacingStyle('margin', margin, undefined, currentTheme),
    marginTop && createSpacingStyle('margin', marginTop, 'top', currentTheme),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom', currentTheme),
    marginLeft && createSpacingStyle('margin', marginLeft, 'left', currentTheme),
    marginRight && createSpacingStyle('margin', marginRight, 'right', currentTheme),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal', currentTheme),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical', currentTheme),
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