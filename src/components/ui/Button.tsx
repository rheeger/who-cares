import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { createButtonStyles, combineStyles, ColorVariant, SizeVariant } from '../../styles/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ColorVariant | 'ghost';
  size?: SizeVariant;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const buttonStyles = createButtonStyles();

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  fullWidth = false,
  style,
  ...props
}) => {
  const containerStyle = combineStyles(
    buttonStyles.base,
    buttonStyles[size],
    buttonStyles[variant],
    disabled && buttonStyles.disabled,
    fullWidth && { width: '100%' },
    style
  );

  const textStyle = combineStyles(
    buttonStyles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof buttonStyles],
    buttonStyles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof buttonStyles],
    disabled && { opacity: 0.6 }
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'success' ? '#FFFFFF' : '#006AA7'} 
          size="small" 
        />
      ) : (
        <Text style={textStyle}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}; 