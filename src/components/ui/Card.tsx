import React from 'react';
import { View, ViewProps } from 'react-native';
import { createCardStyles, combineStyles } from '../../styles/utils';

type SurfaceVariant = 'primary' | 'secondary' | 'glass';
type ShadowVariant = 'flat' | 'elevated' | 'floating';

interface CardProps extends ViewProps {
  variant?: SurfaceVariant;
  shadow?: ShadowVariant;
  children: React.ReactNode;
}

const cardStyles = createCardStyles();

export const Card: React.FC<CardProps> = ({
  variant = 'secondary',
  shadow = 'elevated',
  children,
  style,
  ...props
}) => {
  const combinedStyle = combineStyles(
    cardStyles.base,
    cardStyles[variant],
    cardStyles[shadow],
    style
  );

  return (
    <View style={combinedStyle} {...props}>
      {children}
    </View>
  );
}; 