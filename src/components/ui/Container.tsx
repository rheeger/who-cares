import React from 'react';
import { View, ViewProps } from 'react-native';
import { createContainerStyles, combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';

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

const containerStyles = createContainerStyles();

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
  const spacingStyles = [
    padding && createSpacingStyle('padding', padding),
    margin && createSpacingStyle('margin', margin),
    paddingHorizontal && createSpacingStyle('padding', paddingHorizontal, 'horizontal'),
    paddingVertical && createSpacingStyle('padding', paddingVertical, 'vertical'),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal'),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical'),
    marginTop && createSpacingStyle('margin', marginTop, 'top'),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom'),
    marginLeft && createSpacingStyle('margin', marginLeft, 'left'),
    marginRight && createSpacingStyle('margin', marginRight, 'right'),
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