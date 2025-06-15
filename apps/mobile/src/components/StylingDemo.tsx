import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Container, Input, Alert, Divider, ThemeSwitcher } from './ui';
import { ThemeProvider, useTheme } from './ThemeContext';

// Demo Icons (you can replace these with actual icon components later)
const DemoIcons = {
  search: <Text style={{ fontSize: 16 }}>🔍</Text>,
  heart: <Text style={{ fontSize: 16 }}>❤️</Text>,
  star: <Text style={{ fontSize: 16 }}>⭐</Text>,
  fire: <Text style={{ fontSize: 16 }}>🔥</Text>,
  check: <Text style={{ fontSize: 16 }}>✅</Text>,
  warning: <Text style={{ fontSize: 16 }}>⚠️</Text>,
  user: <Text style={{ fontSize: 16 }}>👤</Text>,
  mail: <Text style={{ fontSize: 16 }}>📧</Text>,
  lock: <Text style={{ fontSize: 16 }}>🔒</Text>,
  settings: <Text style={{ fontSize: 16 }}>⚙️</Text>,
};

const StylingDemoContent: React.FC = () => {
  const { currentTheme } = useTheme();
  
  // Demo state for interactive examples
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  // Form validation helpers
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  const getEmailState = () => {
    if (!email) return 'default';
    return isValidEmail(email) ? 'success' : 'error';
  };

  const getPasswordState = () => {
    if (!password) return 'default';
    return isValidPassword(password) ? 'success' : 'error';
  };

  const handleSubmitForm = () => {
    if (name && isValidEmail(email) && isValidPassword(password)) {
      setFormSubmitted(true);
      setShowSuccessAlert(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const resetDemo = () => {
    setName('');
    setEmail('');
    setPassword('');
    setFormSubmitted(false);
    setShowSuccessAlert(false);
    setShowWelcomeAlert(true);
    setLikeCount(42);
    setIsLiked(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.colors.surface.tertiary }]}>
      <Container variant="content" paddingVertical="xl">
        
        {/* Dynamic Theme Switcher */}
        <ThemeSwitcher />
        
        {/* Header */}
        <Text variant="h1" color="primary" align="center" marginBottom="md">
          🎨 Dynamic Styling System
        </Text>
        <Text variant="bodySmall" color="secondary" align="center" marginBottom="xl">
          7 professional components • 3 complete themes • Infinite possibilities
        </Text>

        {/* Current Theme Info */}
        <Card variant="glass" shadow="elevated" marginBottom="xl">
          <Container variant="row" justify="spaceBetween" marginBottom="sm">
            <Text variant="bodySmall" color="tertiary">Active Theme:</Text>
            <Text variant="bodySmall" color="accent" weight="bold">
              {currentTheme.emoji} {currentTheme.name}
            </Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween" marginBottom="sm">
            <Text variant="bodySmall" color="tertiary">Components Built:</Text>
            <Text variant="bodySmall" color="success" weight="bold">7/25 (28%)</Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween">
            <Text variant="bodySmall" color="tertiary">Design Systems:</Text>
            <Text variant="bodySmall" color="success" weight="bold">3 Complete</Text>
          </Container>
        </Card>

        {/* Interactive Demo: User Registration Form */}
        <Divider label="INTERACTIVE DEMO: USER REGISTRATION" marginVertical="lg" />
        
        {showSuccessAlert && (
          <Alert
            variant="success"
            title="Welcome to WhoCares!"
            message={`Thanks for joining us, ${name}! Your account has been created with ${currentTheme.name} theme.`}
            dismissible
            onDismiss={() => setShowSuccessAlert(false)}
            action={{
              label: "Get Started",
              onPress: () => console.log("Navigate to onboarding")
            }}
            marginBottom="md"
          />
        )}

        {!formSubmitted ? (
          <Card variant="secondary" shadow="elevated" marginBottom="lg">
            <Text variant="h3" color="primary" marginBottom="lg">
              Create Your Account
            </Text>
            
            <Input
              variant="outlined"
              size="md"
              placeholder="Your full name"
              label="Full Name"
              leftIcon={DemoIcons.user}
              value={name}
              onChangeText={setName}
              hint="This will be displayed in your profile"
              marginBottom="md"
            />
            
            <Input
              variant="outlined"
              size="md"
              placeholder="email@example.com"
              label="Email Address"
              leftIcon={DemoIcons.mail}
              value={email}
              onChangeText={setEmail}
              state={getEmailState()}
              error={email && !isValidEmail(email) ? "Please enter a valid email" : undefined}
              success={email && isValidEmail(email) ? "Email looks good!" : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
              marginBottom="md"
            />
            
            <Input
              variant="outlined"
              size="md"
              placeholder="At least 6 characters"
              label="Password"
              leftIcon={DemoIcons.lock}
              value={password}
              onChangeText={setPassword}
              state={getPasswordState()}
              error={password && !isValidPassword(password) ? "Password must be at least 6 characters" : undefined}
              success={password && isValidPassword(password) ? "Strong password!" : undefined}
              secureTextEntry
              marginBottom="lg"
            />
            
            <Button
              variant={name && isValidEmail(email) && isValidPassword(password) ? "primary" : "secondary"}
              size="lg"
              fullWidth
              disabled={!name || !isValidEmail(email) || !isValidPassword(password)}
              onPress={handleSubmitForm}
              icon={DemoIcons.check}
              iconPosition="right"
            >
              Create Account
            </Button>
          </Card>
        ) : (
          <Card variant="primary" shadow="elevated" marginBottom="lg">
            <Text variant="h3" color="inverse" align="center" marginBottom="sm">
              🎉 Account Created Successfully!
            </Text>
            <Text variant="body" color="inverse" align="center" marginBottom="lg">
              Welcome to the WhoCares community, {name}! Enjoying the {currentTheme.name} theme?
            </Text>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onPress={resetDemo}
            >
              Try Demo Again
            </Button>
          </Card>
        )}

        {/* Button Showcase */}
        <Divider label="BUTTONS & INTERACTIONS" marginVertical="lg" />
        
        <Container variant="column" marginBottom="lg">
          <Button variant="primary" size="lg" marginBottom="sm" icon={DemoIcons.fire} iconPosition="left">
            Primary Action
          </Button>
          
          <Button variant="success" size="md" marginBottom="sm" icon={DemoIcons.check} iconPosition="right">
            Success State
          </Button>
          
          <Container variant="row" marginBottom="sm" style={{ gap: currentTheme.spacing.sm }}>
            <Button 
              variant={isLiked ? "warning" : "secondary"} 
              size="md" 
              icon={isLiked ? DemoIcons.heart : DemoIcons.star}
              onPress={handleLike}
              style={{ flex: 1 }}
            >
              {isLiked ? "Liked" : "Like"} ({likeCount})
            </Button>
            
            <Button variant="ghost" size="md" icon={DemoIcons.settings} style={{ flex: 1 }}>
              Settings
            </Button>
          </Container>
          
          <Button variant="warning" loading={true} size="md" marginBottom="sm">
            Loading State
          </Button>
          
          <Button variant="danger" size="sm" disabled>
            Disabled Button
          </Button>
        </Container>

        {/* Alerts Showcase */}
        <Divider label="NOTIFICATIONS & FEEDBACK" marginVertical="lg" />
        
        <Container variant="column" marginBottom="lg">
          {showWelcomeAlert && (
            <Alert
              variant="info"
              title={`Welcome to ${currentTheme.name} Theme!`}
              message={`${currentTheme.description} - Try switching themes above to see the magic!`}
              dismissible
              onDismiss={() => setShowWelcomeAlert(false)}
              marginBottom="md"
            />
          )}
          
          <Alert
            variant="warning"
            title="Theme System Demo"
            message="Switch between Swedish, Earth, and Dreamy themes to see component transformations"
            icon={DemoIcons.warning}
            action={{
              label: "Learn More",
              onPress: () => console.log("Show theme details")
            }}
            marginBottom="md"
          />
          
          <Alert
            variant="danger"
            message="This is how error states look in the current theme - notice the colors adapt!"
            action={{
              label: "Retry",
              onPress: () => console.log("Retry action")
            }}
          />
        </Container>

        {/* Typography Showcase */}
        <Divider label="TYPOGRAPHY SYSTEM" marginVertical="lg" />
        
        <Card variant="glass" shadow="elevated" marginBottom="lg">
          <Text variant="h1" color="primary" marginBottom="sm">
            {currentTheme.typography.fonts.heading} • {currentTheme.typography.styles.h1.fontSize}px
          </Text>
          <Text variant="h2" color="primary" marginBottom="sm">
            Heading 2 • {currentTheme.typography.styles.h2.fontSize}px
          </Text>
          <Text variant="h3" color="accent" marginBottom="md">
            Accent Color • {currentTheme.typography.styles.h3.fontSize}px
          </Text>
          
          <Text variant="bodyLarge" color="secondary" marginBottom="xs">
            Large body text • {currentTheme.typography.styles.bodyLarge.fontSize}px
          </Text>
          <Text variant="body" color="tertiary" marginBottom="xs">
            Regular body text • {currentTheme.typography.styles.body.fontSize}px
          </Text>
          <Text variant="bodySmall" color="tertiary" marginBottom="xs">
            Small body text • {currentTheme.typography.styles.bodySmall.fontSize}px
          </Text>
          <Text variant="caption" color="tertiary">
            Caption text • {currentTheme.typography.styles.caption.fontSize}px
          </Text>
        </Card>

        {/* Layout & Cards Showcase */}
        <Divider label="LAYOUT & SURFACES" marginVertical="lg" />
        
        <Container variant="column" marginBottom="lg">
          <Card variant="glass" shadow="elevated" marginBottom="md">
            <Container variant="row" style={{ alignItems: 'center', gap: currentTheme.spacing.md }}>
              <Text style={{ fontSize: 32 }}>🌟</Text>
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="primary" marginBottom="xs">
                  Glass Surface
                </Text>
                <Text variant="bodySmall" color="secondary">
                  Adapts to {currentTheme.name} theme colors
                </Text>
              </View>
            </Container>
          </Card>
          
          <Card variant="secondary" shadow="floating" marginBottom="md">
            <Container variant="row" style={{ alignItems: 'center', gap: currentTheme.spacing.md }}>
              <Text style={{ fontSize: 32 }}>🎯</Text>
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="primary" marginBottom="xs">
                  Secondary Surface
                </Text>
                <Text variant="bodySmall" color="secondary">
                  Shadow style: {currentTheme.name === 'earth' ? 'Organic' : currentTheme.name === 'dreamy' ? 'Soft' : 'Clean'}
                </Text>
              </View>
            </Container>
          </Card>
          
          <Card variant="primary" shadow="elevated">
            <Container variant="row" style={{ alignItems: 'center', gap: currentTheme.spacing.md }}>
              <Text style={{ fontSize: 32 }}>{currentTheme.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="inverse" marginBottom="xs">
                  Primary Surface
                </Text>
                <Text variant="bodySmall" color="inverse">
                  {currentTheme.description}
                </Text>
              </View>
            </Container>
          </Card>
        </Container>

        {/* Theme Statistics */}
        <Divider label="THEME STATISTICS" marginVertical="lg" />
        
        <Card variant="glass" shadow="elevated" marginBottom="lg">
          <Text variant="h3" color="accent" align="center" marginBottom="md">
            📊 {currentTheme.name} Theme Specs
          </Text>
          
          <Container variant="row" justify="spaceBetween" marginBottom="xs">
            <Text variant="bodySmall" color="tertiary">Spacing Scale:</Text>
            <Text variant="bodySmall" color="primary">{currentTheme.spacing.xs}-{currentTheme.spacing.xxxl}px</Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween" marginBottom="xs">
            <Text variant="bodySmall" color="tertiary">Border Radius:</Text>
            <Text variant="bodySmall" color="primary">{currentTheme.layout.borderRadius.sm}-{currentTheme.layout.borderRadius.lg}px</Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween" marginBottom="xs">
            <Text variant="bodySmall" color="tertiary">Typography Sizes:</Text>
            <Text variant="bodySmall" color="primary">{currentTheme.typography.styles.caption.fontSize}-{currentTheme.typography.styles.h1.fontSize}px</Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween">
            <Text variant="bodySmall" color="tertiary">Shadow Style:</Text>
            <Text variant="bodySmall" color="primary">
              {currentTheme.name === 'earth' ? 'Off-center organic' : 
               currentTheme.name === 'dreamy' ? 'Soft & cushioned' : 
               'Clean & precise'}
            </Text>
          </Container>
        </Card>

        {/* Footer */}
        <Card variant="primary" shadow="elevated">
          <Text variant="h3" color="inverse" align="center" marginBottom="md">
            🚀 Design System Mastery
          </Text>
          
          <Text variant="body" color="inverse" align="center" marginBottom="lg">
            You've just experienced the power of semantic design tokens! Each theme transforms every component while maintaining perfect consistency.
          </Text>
          
          <Container variant="row" style={{ gap: currentTheme.spacing.sm }}>
            <Button variant="secondary" size="sm" style={{ flex: 1 }}>
              Export Theme
            </Button>
            <Button variant="secondary" size="sm" style={{ flex: 1 }}>
              Fork Design
            </Button>
            <Button variant="secondary" size="sm" style={{ flex: 1 }}>
              Share Demo
            </Button>
          </Container>
        </Card>

        {/* Footer Spacer */}
        <View style={{ height: 40 }} />

      </Container>
    </ScrollView>
  );
};

export const StylingDemo: React.FC = () => {
  return (
    <ThemeProvider>
      <StylingDemoContent />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 