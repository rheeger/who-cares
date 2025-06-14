import React, { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Home} from './components/Home/Home';
import {StylingDemo} from './components/StylingDemo';
import {COLORS, theme} from './styles/theme';

function App(): JSX.Element {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BLACK} />
      <SafeAreaView style={styles.safeArea}>
        {/* Toggle Button */}
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowDemo(!showDemo)}
        >
          <Text style={styles.toggleText}>
            {showDemo ? '🏠 Back to Home' : '🎨 View Styling Demo'}
          </Text>
        </TouchableOpacity>

        {/* Content */}
        {showDemo ? <StylingDemo /> : <Home />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  safeArea: {
    flex: 1,
  },
  toggleButton: {
    backgroundColor: theme.colors.interactive.secondary,
    padding: theme.spacing.sm,
    margin: theme.spacing.md,
    borderRadius: theme.layout.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  toggleText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontFamily: theme.typography.fonts.bodyBold,
  },
});

export default App; 