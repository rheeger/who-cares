import React from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { COLORS, theme } from '../styles/theme';

// Simple demo components using new theme
const DemoButton = ({ variant, children }: { variant: string, children: string }) => (
  <View style={[
    styles.button,
    variant === 'primary' && { backgroundColor: theme.colors.interactive.primary },
    variant === 'success' && { backgroundColor: theme.colors.interactive.success },
    variant === 'secondary' && { backgroundColor: theme.colors.interactive.secondary, borderWidth: 1, borderColor: theme.colors.border.medium }
  ]}>
    <RNText style={[
      theme.typography.styles.button,
      variant === 'primary' && { color: theme.colors.text.inverse },
      variant === 'success' && { color: theme.colors.text.inverse },
      variant === 'secondary' && { color: theme.colors.text.primary }
    ]}>
      {children}
    </RNText>
  </View>
);

const DemoText = ({ variant = 'body', color = 'primary', children }: { variant?: keyof typeof theme.typography.styles, color?: keyof typeof theme.colors.text, children: string }) => (
  <RNText style={[
    theme.typography.styles[variant],
    { color: theme.colors.text[color] }
  ]}>
    {children}
  </RNText>
);

const Card = ({ variant, children }: { variant?: string, children: React.ReactNode }) => (
  <View style={[
    styles.card,
    variant === 'glass' && { backgroundColor: theme.colors.surface.glass, borderWidth: 1, borderColor: theme.colors.border.subtle },
    variant === 'secondary' && { backgroundColor: theme.colors.surface.secondary },
    variant === 'primary' && { backgroundColor: theme.colors.surface.primary }
  ]}>
    {children}
  </View>
);

export const StylingDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <DemoText variant="h2" color="primary">🎨 New Styling System</DemoText>
        <DemoText variant="bodySmall" color="secondary">Semantic tokens, consistent components, maintainable code</DemoText>
      </View>

      <View style={styles.section}>
        <DemoText variant="h3" color="accent">Buttons</DemoText>
        <DemoButton variant="primary">Primary Button</DemoButton>
        <DemoButton variant="success">Success Button</DemoButton>
        <DemoButton variant="secondary">Secondary Button</DemoButton>
      </View>

      <View style={styles.section}>
        <DemoText variant="h3" color="accent">Typography</DemoText>
        <DemoText variant="h1" color="primary">Heading 1</DemoText>
        <DemoText variant="h2" color="primary">Heading 2</DemoText>
        <DemoText variant="bodyLarge" color="secondary">Large body text</DemoText>
        <DemoText variant="body" color="tertiary">Regular body text</DemoText>
        <DemoText variant="caption" color="tertiary">Caption text</DemoText>
      </View>

      <View style={styles.section}>
        <DemoText variant="h3" color="accent">Cards</DemoText>
        
        <Card variant="glass">
          <DemoText variant="bodySmall" color="primary">Glass card with subtle border</DemoText>
        </Card>
        
        <Card variant="secondary">
          <DemoText variant="bodySmall" color="primary">Secondary surface card</DemoText>
        </Card>
        
        <Card variant="primary">
          <DemoText variant="bodySmall" color="inverse">Primary surface card</DemoText>
        </Card>
      </View>

      <View style={styles.section}>
        <DemoText variant="h3" color="accent">Before vs After</DemoText>
        
        <Card variant="glass">
          <DemoText variant="bodySmall" color="success">✅ BEFORE: 50+ lines of StyleSheet per component</DemoText>
          <DemoText variant="bodySmall" color="success">✅ AFTER: &lt;DemoButton variant="primary"&gt;</DemoText>
          <DemoText variant="caption" color="tertiary">70% less code, 100% more maintainable</DemoText>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.tertiary,
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.layout.borderRadius.md,
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  card: {
    borderRadius: theme.layout.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.medium,
  },
}); 