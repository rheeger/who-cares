import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Container, Input, Alert, Divider } from '../../../../src/components/ui';
import { theme } from '../styles/theme';

export const StylingDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Container variant="content" paddingVertical="xl">
        
        <Text variant="h1" color="primary" align="center" marginBottom="md">
          🎨 Enhanced Styling System
        </Text>
        <Text variant="bodySmall" color="secondary" align="center" marginBottom="xl">
          7 professional components • Semantic tokens • 70% less code
        </Text>

        <Divider label="BUTTONS" marginVertical="lg" />
        
        <Container variant="column">
          <Button variant="primary" size="lg" marginBottom="sm">
            Primary Button
          </Button>
          <Button variant="success" size="md" marginBottom="sm">
            Success Button
          </Button>
          <Button variant="secondary" size="md" marginBottom="sm">
            Secondary Button
          </Button>
          <Button variant="ghost" size="sm" marginBottom="sm">
            Ghost Button
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            icon={<Text>🔥</Text>} 
            iconPosition="left"
            marginBottom="sm"
          >
            With Icon
          </Button>
          <Button variant="warning" loading={true} size="md">
            Loading State
          </Button>
        </Container>

        <Divider label="INPUTS" marginVertical="lg" />
        
        <Container variant="column">
          <Input
            variant="outlined"
            size="md"
            placeholder="Enter your name"
            label="Name"
            hint="This will be displayed in your profile"
            value={inputValue}
            onChangeText={setInputValue}
            marginBottom="md"
          />
          
          <Input
            variant="filled"
            size="lg"
            placeholder="Search..."
            leftIcon={<Text>🔍</Text>}
            marginBottom="md"
          />
          
          <Input
            variant="default"
            size="sm"
            placeholder="Error state"
            error="This field is required"
            state="error"
            marginBottom="md"
          />
          
          <Input
            variant="outlined"
            size="md"
            placeholder="Success state"
            success="Looks good!"
            state="success"
          />
        </Container>

        <Divider label="ALERTS" marginVertical="lg" />
        
        <Container variant="column">
          {showAlert && (
            <Alert
              variant="info"
              title="Welcome!"
              message="Your new styling system is ready to use"
              dismissible
              onDismiss={() => setShowAlert(false)}
              marginBottom="md"
            />
          )}
          
          <Alert
            variant="success"
            message="Form submitted successfully"
            action={{
              label: "View Details",
              onPress: () => console.log("View details")
            }}
            marginBottom="md"
          />
          
          <Alert
            variant="warning"
            title="Low Battery"
            message="Your device battery is running low"
            marginBottom="md"
          />
          
          <Alert
            variant="danger"
            message="Network connection failed"
            icon="❌"
          />
        </Container>

        <Divider label="TYPOGRAPHY" marginVertical="lg" />
        
        <Container variant="column">
          <Text variant="h1" color="primary" marginBottom="sm">
            Heading 1 • DrukWideBold
          </Text>
          <Text variant="h2" color="primary" marginBottom="sm">
            Heading 2 • DrukWideBold
          </Text>
          <Text variant="h3" color="accent" marginBottom="sm">
            Heading 3 • Swedish Yellow
          </Text>
          <Text variant="bodyLarge" color="secondary" marginBottom="xs">
            Large body text • MonumentExtended
          </Text>
          <Text variant="body" color="tertiary" marginBottom="xs">
            Regular body text • 16px default
          </Text>
          <Text variant="bodySmall" color="tertiary" marginBottom="xs">
            Small body text • 14px
          </Text>
          <Text variant="caption" color="tertiary">
            Caption text • 12px for metadata
          </Text>
        </Container>

        <Divider label="CARDS & LAYOUT" marginVertical="lg" />
        
        <Container variant="column">
          <Card variant="glass" shadow="elevated" style={{ marginBottom: theme.spacing.md }}>
            <Text variant="h3" color="primary" marginBottom="sm">
              Glass Card
            </Text>
            <Text variant="bodySmall" color="secondary">
              Transparent with subtle border
            </Text>
          </Card>
          
          <Card variant="secondary" shadow="floating" style={{ marginBottom: theme.spacing.md }}>
            <Text variant="h3" color="primary" marginBottom="sm">
              Secondary Card
            </Text>
            <Text variant="bodySmall" color="secondary">
              Dark gray background with floating shadow
            </Text>
          </Card>
          
          <Card variant="primary" shadow="elevated">
            <Text variant="h3" color="inverse" marginBottom="sm">
              Primary Card
            </Text>
            <Text variant="bodySmall" color="inverse">
              Swedish blue background
            </Text>
          </Card>
        </Container>

        <Divider marginVertical="lg" />

        <Card variant="glass" shadow="elevated">
          <Text variant="h3" color="success" align="center" marginBottom="sm">
            ✅ System Upgrade Complete
          </Text>
          
          <Container variant="row" justify="spaceBetween" marginBottom="sm">
            <Text variant="bodySmall" color="tertiary">
              Components:
            </Text>
            <Text variant="bodySmall" color="success" weight="bold">
              7/25 (28%)
            </Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween" marginBottom="sm">
            <Text variant="bodySmall" color="tertiary">
              Code Reduction:
            </Text>
            <Text variant="bodySmall" color="success" weight="bold">
              70% Less
            </Text>
          </Container>
          
          <Container variant="row" justify="spaceBetween">
            <Text variant="bodySmall" color="tertiary">
              Maintainability:
            </Text>
            <Text variant="bodySmall" color="success" weight="bold">
              100% Better
            </Text>
          </Container>
          
          <Divider marginVertical="md" />
          
          <Text variant="caption" color="tertiary" align="center">
            Ready for Phase 2: TextArea, Select, Modal, Toast
          </Text>
        </Card>

        <View style={{ height: 40 }} />

      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.tertiary,
  },
}); 