import React from 'react';
import { View, ViewProps } from 'react-native';
import { createContainerStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { useTheme } from '../ThemeContext';

type LayoutVariant = 'screen' | 'content' | 'centered' | 'row' | 'column';
type JustifyVariant = 'spaceBetween' | 'spaceAround' | 'spaceEvenly';

interface ContainerProps extends ViewProps {
  variant?: LayoutVariant;
  justify?: JustifyVariant;
  padding?: SpacingKey | number;
  margin?: SpacingKey | number;
  paddingHorizontal?: SpacingKey | number;
  paddingVertical?: SpacingKey | number;
  marginHorizontal?: SpacingKey | number;
  marginVertical?: SpacingKey | number;
  marginTop?: SpacingKey | number;
  marginBottom?: SpacingKey | number;
  marginLeft?: SpacingKey | number;
  marginRight?: SpacingKey | number;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  variant = 'content',
  justify,
  padding,
  margin,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  children,
  style,
  ...props
}) => {
  const { currentTheme } = useTheme();
  const containerStyles = createContainerStyles(currentTheme);
  
  const spacingStyles = [
    padding && createSpacingStyle('padding', padding, undefined, currentTheme),
    margin && createSpacingStyle('margin', margin, undefined, currentTheme),
    paddingHorizontal && createSpacingStyle('padding', paddingHorizontal, 'horizontal', currentTheme),
    paddingVertical && createSpacingStyle('padding', paddingVertical, 'vertical', currentTheme),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal', currentTheme),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical', currentTheme),
    marginTop && createSpacingStyle('margin', marginTop, 'top', currentTheme),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom', currentTheme),
    marginLeft && createSpacingStyle('margin', marginLeft, 'left', currentTheme),
    marginRight && createSpacingStyle('margin', marginRight, 'right', currentTheme),
  ].filter(Boolean);

  const combinedStyle = combineStyles(
    containerStyles[variant],
    justify && containerStyles[justify],
    ...spacingStyles,
    style
  );

  return (
    <View style={combinedStyle} {...props}>
      {children}
    </View>
  );
}; 