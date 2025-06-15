import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { theme } from './theme';

// Type definitions for style variants
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
export type SpacingKey = keyof typeof theme.spacing;

// Utility to get color from theme
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: any = theme.colors;
  
  for (const key of keys) {
    result = result?.[key];
  }
  
  return result || '#000000';
};

// Utility to get spacing value
export const getSpacing = (key: SpacingKey): number => {
  return theme.spacing[key];
};

// Utility to get typography style
export const getTypographyStyle = (variant: keyof typeof theme.typography.styles): TextStyle => {
  return theme.typography.styles[variant];
};

// Create responsive styles based on screen width
export const createResponsiveStyle = (styles: {
  small?: ViewStyle | TextStyle;
  medium?: ViewStyle | TextStyle;
  large?: ViewStyle | TextStyle;
}) => {
  const { screenWidth } = theme.layout;
  
  if (screenWidth >= theme.layout.breakpoints.large && styles.large) {
    return styles.large;
  }
  if (screenWidth >= theme.layout.breakpoints.medium && styles.medium) {
    return styles.medium;
  }
  return styles.small || {};
};

// Button style variants
export const createButtonStyles = () => StyleSheet.create({
  // Base button styles
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.layout.borderRadius.md,
    ...theme.shadows.medium,
  },
  
  // Size variants
  sm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minHeight: 32,
  },
  md: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
  },
  lg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    minHeight: 56,
  },
  xl: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    minHeight: 64,
  },
  
  // Color variants
  primary: {
    backgroundColor: theme.colors.interactive.primary,
  },
  secondary: {
    backgroundColor: theme.colors.interactive.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  success: {
    backgroundColor: theme.colors.interactive.success,
  },
  warning: {
    backgroundColor: theme.colors.interactive.success,
  },
  danger: {
    backgroundColor: theme.colors.interactive.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  
  // State variants
  disabled: {
    backgroundColor: theme.colors.interactive.primaryDisabled,
    opacity: 0.6,
  },
  
  // Text styles for buttons
  textPrimary: {
    color: theme.colors.text.inverse,
    ...theme.typography.styles.button,
  },
  textSecondary: {
    color: theme.colors.text.primary,
    ...theme.typography.styles.button,
  },
  textSuccess: {
    color: theme.colors.text.inverse,
    ...theme.typography.styles.button,
  },
  textDanger: {
    color: theme.colors.text.primary,
    ...theme.typography.styles.button,
  },
  textGhost: {
    color: theme.colors.text.primary,
    ...theme.typography.styles.button,
  },
  
  // Size-specific text styles
  textSm: {
    ...theme.typography.styles.bodySmall,
    fontFamily: theme.typography.fonts.bodyBold,
  },
  textMd: {
    ...theme.typography.styles.button,
  },
  textLg: {
    ...theme.typography.styles.buttonLarge,
  },
  textXl: {
    ...theme.typography.styles.buttonLarge,
    fontSize: 24,
  },
});

// Card style variants
export const createCardStyles = () => StyleSheet.create({
  base: {
    borderRadius: theme.layout.borderRadius.lg,
    padding: theme.spacing.md,
  },
  
  // Surface variants
  primary: {
    backgroundColor: theme.colors.surface.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface.secondary,
  },
  glass: {
    backgroundColor: theme.colors.surface.glass,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  
  // Shadow variants
  flat: {},
  elevated: {
    ...theme.shadows.medium,
  },
  floating: {
    ...theme.shadows.large,
  },
});

// Text style variants
export const createTextStyles = () => StyleSheet.create({
  // Heading styles
  h1: {
    ...theme.typography.styles.h1,
    color: theme.colors.text.primary,
  },
  h2: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
  },
  h3: {
    ...theme.typography.styles.h3,
    color: theme.colors.text.primary,
  },
  
  // Body text styles
  bodyLarge: {
    ...theme.typography.styles.bodyLarge,
    color: theme.colors.text.primary,
  },
  body: {
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
  bodySmall: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.primary,
  },
  caption: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  
  // Color variants
  primary: { color: theme.colors.text.primary },
  secondary: { color: theme.colors.text.secondary },
  tertiary: { color: theme.colors.text.tertiary },
  accent: { color: theme.colors.text.accent },
  success: { color: theme.colors.text.success },
  warning: { color: theme.colors.text.warning },
  danger: { color: theme.colors.text.danger },
  inverse: { color: theme.colors.text.inverse },
  
  // Alignment
  center: { textAlign: 'center' },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
});

// Container style variants
export const createContainerStyles = () => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surface.tertiary,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
});

// Utility function to combine styles
export const combineStyles = (...styles: any[]) => {
  return StyleSheet.flatten(styles.filter(Boolean));
};

// Utility to create margin/padding styles
export const createSpacingStyle = (
  type: 'margin' | 'padding',
  spacing: SpacingKey | number,
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'horizontal' | 'vertical'
) => {
  const value = typeof spacing === 'number' ? spacing : getSpacing(spacing);
  
  if (!direction) {
    return { [type]: value };
  }
  
  switch (direction) {
    case 'top': return { [`${type}Top`]: value };
    case 'bottom': return { [`${type}Bottom`]: value };
    case 'left': return { [`${type}Left`]: value };
    case 'right': return { [`${type}Right`]: value };
    case 'horizontal': return { [`${type}Horizontal`]: value };
    case 'vertical': return { [`${type}Vertical`]: value };
    default: return { [type]: value };
  }
}; 