import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import { createButtonStyles, combineStyles, ColorVariant, SizeVariant, createSpacingStyle, SpacingKey } from '../../styles/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ColorVariant | 'ghost';
  size?: SizeVariant;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string; // For future web support
  // Enhanced accessibility
  accessibilityRole?: 'button' | 'link';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
  };
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginLeft?: SpacingKey;
  marginRight?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
}

const buttonStyles = createButtonStyles();

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  accessibilityRole = 'button',
  accessibilityState,
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

  const containerStyle = combineStyles(
    buttonStyles.base,
    buttonStyles[size],
    buttonStyles[variant],
    disabled && buttonStyles.disabled,
    fullWidth && { width: '100%' },
    ...spacingStyles,
    style
  );

  const textStyle = combineStyles(
    buttonStyles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof buttonStyles],
    buttonStyles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof buttonStyles],
    disabled && { opacity: 0.6 }
  );

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'success' ? '#FFFFFF' : '#006AA7'} 
          size="small" 
        />
      );
    }

    if (icon) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {iconPosition === 'left' && icon}
          <Text style={textStyle}>{children}</Text>
          {iconPosition === 'right' && icon}
        </View>
      );
    }

    return <Text style={textStyle}>{children}</Text>;
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: disabled || loading, ...accessibilityState }}
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}; 