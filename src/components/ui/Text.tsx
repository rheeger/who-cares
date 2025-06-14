import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { createTextStyles, combineStyles } from '../../styles/utils';
import { theme } from '../../styles/theme';

type TypographyVariant = keyof typeof theme.typography.styles;
type ColorVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse';
type AlignVariant = 'left' | 'center' | 'right';

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: ColorVariant;
  align?: AlignVariant;
  children: React.ReactNode;
}

const textStyles = createTextStyles();

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  align,
  children,
  style,
  ...props
}) => {
  const combinedStyle = combineStyles(
    textStyles[variant],
    textStyles[color],
    align && textStyles[align],
    style
  );

  return (
    <RNText style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
}; 