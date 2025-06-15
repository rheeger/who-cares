import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { createTextStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { useTheme } from '../ThemeContext';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption' | 'button' | 'buttonLarge';
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
  const { currentTheme } = useTheme();
  const textStyles = createTextStyles(currentTheme);
  
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
    (textStyles as any)[variant],
    (textStyles as any)[color],
    align && (textStyles as any)[align],
    weight === 'bold' && { fontFamily: currentTheme.typography.fonts.bodyBold },
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