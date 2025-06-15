import React, { useState, forwardRef } from 'react';
import { TextInput, View, TextInputProps, ViewStyle } from 'react-native';
import { Text } from './Text';
import { combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { theme } from '../../styles/theme';

type InputVariant = 'default' | 'outlined' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success' | 'disabled';

interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
  // Style overrides
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

const createInputStyles = () => ({
  container: {
    width: '100%',
  },
  
  // Base input styles
  inputBase: {
    borderRadius: theme.layout.borderRadius.md,
    fontFamily: theme.typography.fonts.body,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  
  // Size variants
  inputSm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: 14,
    minHeight: 32,
  },
  inputMd: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    fontSize: 16,
    minHeight: 44,
  },
  inputLg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    fontSize: 18,
    minHeight: 56,
  },
  
  // Variant styles
  inputDefault: {
    backgroundColor: theme.colors.surface.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  inputOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.border.medium,
  },
  inputFilled: {
    backgroundColor: theme.colors.surface.glass,
    borderWidth: 0,
  },
  
  // State styles
  inputError: {
    borderColor: theme.colors.border.danger,
  },
  inputSuccess: {
    borderColor: theme.colors.border.success,
  },
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: theme.colors.surface.tertiary,
  },
  
  // Icon container
  iconContainer: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    width: 40,
  },
  leftIcon: {
    left: theme.spacing.sm,
  },
  rightIcon: {
    right: theme.spacing.sm,
  },
  
  // Input with icons
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
});

export const Input = forwardRef<TextInput, InputProps>(({
  variant = 'default',
  size = 'md',
  state = 'default',
  label,
  hint,
  error,
  success,
  leftIcon,
  rightIcon,
  fullWidth = true,
  margin,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  containerStyle,
  inputStyle,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = createInputStyles();
  
  const spacingStyles = [
    margin && createSpacingStyle('margin', margin),
    marginTop && createSpacingStyle('margin', marginTop, 'top'),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom'),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal'),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical'),
  ].filter(Boolean);

  const inputContainerStyle = combineStyles(
    styles.container,
    fullWidth && { width: '100%' },
    ...spacingStyles,
    containerStyle
  );

  const textInputStyle = combineStyles(
    styles.inputBase,
    styles[`input${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
    styles[`input${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles],
    state === 'error' && styles.inputError,
    state === 'success' && styles.inputSuccess,
    state === 'disabled' && styles.inputDisabled,
    isFocused && variant === 'outlined' && { borderColor: theme.colors.interactive.primary },
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    inputStyle
  );

  const getPlaceholderColor = () => {
    if (state === 'disabled') return theme.colors.text.tertiary;
    return theme.colors.text.secondary;
  };

  const getHelpText = () => {
    if (error) return { text: error, color: 'danger' as const };
    if (success) return { text: success, color: 'success' as const };
    if (hint) return { text: hint, color: 'secondary' as const };
    return null;
  };

  const helpText = getHelpText();

  return (
    <View style={inputContainerStyle}>
      {label && (
        <Text 
          variant="bodySmall" 
          color="secondary" 
          marginBottom="xs"
        >
          {label}
        </Text>
      )}
      
      <View style={{ position: 'relative' }}>
        <TextInput
          ref={ref}
          style={textInputStyle}
          placeholderTextColor={getPlaceholderColor()}
          editable={state !== 'disabled'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {leftIcon && (
          <View style={[styles.iconContainer, styles.leftIcon]}>
            {leftIcon}
          </View>
        )}
        
        {rightIcon && (
          <View style={[styles.iconContainer, styles.rightIcon]}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {helpText && (
        <Text 
          variant="caption" 
          color={helpText.color}
          marginTop="xs"
        >
          {helpText.text}
        </Text>
      )}
    </View>
  );
}); 