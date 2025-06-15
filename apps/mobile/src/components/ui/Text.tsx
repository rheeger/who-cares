import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { createTextStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { theme } from '../../styles/theme';

type TypographyVariant = keyof typeof theme.typography.styles;
type ColorVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse';
type AlignVariant = 'left' | 'center' | 'right';
type WeightVariant = 'normal' | 'bold';

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: ColorVariant;
  align?: AlignVariant;
  weight?: WeightVariant;
  children: React.ReactNode;
  // Enhanced props
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginLeft?: SpacingKey;
  marginRight?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
}

const textStyles = createTextStyles();

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  align,
  weight,
  children,
  numberOfLines,
  ellipsizeMode = 'tail',
  selectable = false,
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
    textStyles[variant],
    textStyles[color],
    align && textStyles[align],
    weight === 'bold' && { fontFamily: theme.typography.fonts.bodyBold },
    ...spacingStyles,
    style
  );

  return (
    <RNText 
      style={combinedStyle} 
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      {...props}
    >
      {children}
    </RNText>
  );
}; 