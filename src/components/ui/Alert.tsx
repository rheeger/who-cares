import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { theme } from '../../styles/theme';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
type AlertSize = 'sm' | 'md' | 'lg';

interface AlertProps extends ViewProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  message: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
}

const createAlertStyles = () => ({
  // Base alert styles
  base: {
    borderRadius: theme.layout.borderRadius.md,
    borderWidth: 1,
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
  },
  
  // Size variants
  sm: {
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  md: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  lg: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  
  // Variant styles
  info: {
    backgroundColor: theme.colors.surface.glass,
    borderColor: theme.colors.interactive.primary,
  },
  success: {
    backgroundColor: theme.colors.surface.success,
    borderColor: theme.colors.border.success,
  },
  warning: {
    backgroundColor: theme.colors.surface.warning,
    borderColor: theme.colors.border.warning,
  },
  danger: {
    backgroundColor: theme.colors.surface.danger,
    borderColor: theme.colors.border.danger,
  },
  
  // Content container
  content: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  
  // Actions container
  actions: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    alignItems: 'center' as const,
  },
  
  // Icon container
  iconContainer: {
    marginTop: 2, // Slight alignment with text
  },
});

const defaultIcons = {
  info: '💡',
  success: '✅',
  warning: '⚠️',
  danger: '❌',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  size = 'md',
  title,
  message,
  icon,
  dismissible = false,
  onDismiss,
  action,
  margin,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  style,
  ...props
}) => {
  const styles = createAlertStyles();
  
  const spacingStyles = [
    margin && createSpacingStyle('margin', margin),
    marginTop && createSpacingStyle('margin', marginTop, 'top'),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom'),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal'),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical'),
  ].filter(Boolean);

  const containerStyle = combineStyles(
    styles.base,
    styles[size],
    styles[variant],
    ...spacingStyles,
    style
  );

  const getTextColor = () => {
    switch (variant) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'primary';
    }
  };

  const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <View style={containerStyle} {...props}>
      {displayIcon && (
        <View style={styles.iconContainer}>
          {typeof displayIcon === 'string' ? (
            <Text variant="body">{displayIcon}</Text>
          ) : (
            displayIcon
          )}
        </View>
      )}
      
      <View style={styles.content}>
        {title && (
          <Text 
            variant="bodySmall" 
            color={getTextColor()} 
            weight="bold"
          >
            {title}
          </Text>
        )}
        
        <Text 
          variant="bodySmall" 
          color="secondary"
        >
          {message}
        </Text>
        
        {(action || dismissible) && (
          <View style={styles.actions}>
            {action && (
              <Button 
                variant="ghost" 
                size="sm" 
                onPress={action.onPress}
              >
                {action.label}
              </Button>
            )}
            
            {dismissible && onDismiss && (
              <Button 
                variant="ghost" 
                size="sm" 
                onPress={onDismiss}
              >
                Dismiss
              </Button>
            )}
          </View>
        )}
      </View>
    </View>
  );
}; 