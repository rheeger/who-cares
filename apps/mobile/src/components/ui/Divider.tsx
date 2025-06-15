import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from './Text';
import { combineStyles, createSpacingStyle, SpacingKey } from '../../styles/utils';
import { theme } from '../../styles/theme';

type DividerVariant = 'horizontal' | 'vertical';
type DividerWeight = 'thin' | 'medium' | 'thick';

interface DividerProps extends ViewProps {
  variant?: DividerVariant;
  weight?: DividerWeight;
  color?: keyof typeof theme.colors.border;
  length?: number | string;
  label?: string;
  // Spacing props
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
}

const createDividerStyles = () => ({
  // Base divider
  base: {
    backgroundColor: theme.colors.border.subtle,
  },
  
  // Horizontal divider
  horizontal: {
    width: '100%',
    height: 1,
  },
  
  // Vertical divider  
  vertical: {
    width: 1,
    height: '100%',
  },
  
  // Weight variants
  thin: {
    // Keep default 1px
  },
  medium: {
    // 2px thick
  },
  thick: {
    // 4px thick
  },
  
  // Label container
  labelContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.md,
  },
  
  labelLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.subtle,
  },
});

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  weight = 'thin',
  color = 'subtle',
  length,
  label,
  margin,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  style,
  ...props
}) => {
  const styles = createDividerStyles();
  
  const spacingStyles = [
    margin && createSpacingStyle('margin', margin),
    marginTop && createSpacingStyle('margin', marginTop, 'top'),
    marginBottom && createSpacingStyle('margin', marginBottom, 'bottom'),
    marginHorizontal && createSpacingStyle('margin', marginHorizontal, 'horizontal'),
    marginVertical && createSpacingStyle('margin', marginVertical, 'vertical'),
  ].filter(Boolean);

  const getThickness = () => {
    switch (weight) {
      case 'medium': return 2;
      case 'thick': return 4;
      default: return 1;
    }
  };

  const getLengthStyle = () => {
    if (!length) return {};
    
    if (variant === 'horizontal') {
      return { width: length };
    } else {
      return { height: length };
    }
  };

  const dividerStyle = combineStyles(
    styles.base,
    variant === 'horizontal' 
      ? { ...styles.horizontal, height: getThickness() }
      : { ...styles.vertical, width: getThickness() },
    { backgroundColor: theme.colors.border[color] },
    getLengthStyle(),
    ...spacingStyles,
    style
  );

  // If there's a label, create a horizontal divider with text in the middle
  if (label && variant === 'horizontal') {
    return (
      <View style={[styles.labelContainer, ...spacingStyles]} {...props}>
        <View style={[styles.labelLine, { backgroundColor: theme.colors.border[color] }]} />
        <Text variant="caption" color="tertiary">
          {label}
        </Text>
        <View style={[styles.labelLine, { backgroundColor: theme.colors.border[color] }]} />
      </View>
    );
  }

  return <View style={dividerStyle} {...props} />;
}; 