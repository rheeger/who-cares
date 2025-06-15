import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Card } from './Card';
import { Container } from './Container';
import { useTheme } from '../ThemeContext';
import { THEME_PRESETS } from '../../styles/themes';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <Card variant="glass" shadow="elevated" marginBottom="lg">
      <Container variant="column">
        <Text variant="h3" color="accent" align="center" marginBottom="md">
          🎨 Choose Your Style
        </Text>
        
        <Container variant="row" justify="spaceEvenly" style={{ gap: currentTheme.spacing.md }}>
          {THEME_PRESETS.map((preset) => {
            const isActive = currentTheme.id === preset.id;
            
            return (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: isActive 
                      ? currentTheme.colors.interactive.primary 
                      : currentTheme.colors.surface.secondary,
                    borderColor: isActive 
                      ? currentTheme.colors.border.accent 
                      : currentTheme.colors.border.subtle,
                    borderWidth: isActive ? 2 : 1,
                    borderRadius: currentTheme.layout.borderRadius.md,
                    padding: currentTheme.spacing.md,
                    ...currentTheme.shadows.medium,
                  }
                ]}
                onPress={() => setTheme(preset)}
                activeOpacity={0.8}
              >
                <Text 
                  style={{ 
                    fontSize: 32,
                    textAlign: 'center',
                    marginBottom: currentTheme.spacing.xs,
                  }}
                >
                  {preset.emoji}
                </Text>
                
                <Text 
                  variant="bodySmall" 
                  color={isActive ? "inverse" : "primary"}
                  align="center"
                  weight="bold"
                  marginBottom="xs"
                >
                  {preset.name}
                </Text>
                
                <Text 
                  variant="caption" 
                  color={isActive ? "inverse" : "secondary"}
                  align="center"
                  numberOfLines={2}
                  style={{ 
                    minHeight: currentTheme.typography.styles.caption.fontSize * 2.2,
                    lineHeight: currentTheme.typography.styles.caption.fontSize * 1.1,
                  }}
                >
                  {preset.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Container>
        
        <Text variant="caption" color="tertiary" align="center" marginTop="md">
          Tap any style to see the design system transform below ✨
        </Text>
      </Container>
    </Card>
  );
};

const styles = StyleSheet.create({
  themeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
}); 