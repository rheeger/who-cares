# 🎨 Styling System Operator Manual

## 📚 Table of Contents
1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Component Library](#component-library)
4. [Theme System](#theme-system)
5. [Usage Examples](#usage-examples)
6. [Migration Guide](#migration-guide)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## 🚀 Quick Start

### Starting Your App
```powershell
# Navigate to mobile app directory
cd apps/mobile

# Start the development server
yarn start
```

### First Time Setup
1. Open your terminal/PowerShell
2. Navigate to your project: `cd C:\Users\navid\Desktop\Projects\who-cares`
3. Go to mobile app: `cd apps/mobile`
4. Start the app: `yarn start`

---

## 🏗️ Architecture Overview

### What We Built
Your app now has a **professional styling foundation** with:

- **🎯 Semantic Design Tokens**: Colors and spacing that have meaning
- **📝 Typography System**: Consistent text styles throughout
- **🧩 Reusable Components**: Pre-built UI pieces you can use anywhere
- **📱 Responsive Design**: Looks good on all device sizes
- **✨ Animation Presets**: Smooth, consistent animations

### File Structure
```
apps/mobile/src/
├── styles/
│   └── theme.ts          # All your design tokens (colors, fonts, spacing)
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Smart button component
│   │   ├── Text.tsx      # Typography component
│   │   ├── Card.tsx      # Container component
│   │   └── Container.tsx # Layout component
│   └── StylingDemo.tsx   # Examples of new system
```

---

## 🧩 Component Library

### 🔘 Button Component

**Simple Usage:**
```jsx
<Button variant="primary" size="lg">
  Click Me!
</Button>
```

**Available Variants:**
- `primary` - Blue Swedish theme button
- `success` - Yellow/green success button  
- `warning` - Warning button
- `danger` - Red error button
- `secondary` - Subtle outlined button
- `ghost` - Transparent button with border

**Available Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (44px height) 
- `lg` - Large (56px height)
- `xl` - Extra Large (64px height)

**Props:**
- `loading={true}` - Shows spinner
- `disabled={true}` - Disables interaction
- `fullWidth={true}` - Takes full container width

### 📝 Text Component

**Simple Usage:**
```jsx
<Text variant="h1" color="primary">
  Main Heading
</Text>
```

**Text Variants:**
- `h1` - Large heading (32px, DrukWideBold)
- `h2` - Medium heading (24px, DrukWideBold) 
- `h3` - Small heading (20px, DrukWideBold)
- `bodyLarge` - Large body text (18px)
- `body` - Regular body text (16px)
- `bodySmall` - Small body text (14px)
- `caption` - Tiny text (12px)
- `button` - Button text style
- `buttonLarge` - Large button text

**Color Options:**
- `primary` - Main white text
- `secondary` - Light gray text
- `tertiary` - Darker gray text  
- `accent` - Swedish yellow highlight
- `success` - Green text
- `warning` - Yellow text
- `danger` - Red text
- `inverse` - Dark text (for light backgrounds)

### 🃏 Card Component

**Simple Usage:**
```jsx
<Card variant="glass" shadow="elevated">
  <Text>Content goes here</Text>
</Card>
```

**Surface Variants:**
- `primary` - Blue background
- `secondary` - Dark gray background
- `glass` - Transparent with subtle border

**Shadow Options:**
- `flat` - No shadow
- `elevated` - Medium shadow
- `floating` - Large shadow

### 📦 Container Component

**Simple Usage:**
```jsx
<Container variant="screen" padding="lg">
  <Text>App content</Text>
</Container>
```

**Layout Variants:**
- `screen` - Full screen container
- `content` - Content area with padding
- `centered` - Centers content vertically/horizontally
- `row` - Horizontal layout
- `column` - Vertical layout

**Spacing Props:**
- `padding="lg"` - Adds large padding
- `margin="md"` - Adds medium margin
- `paddingHorizontal="xl"` - Horizontal padding only
- `paddingVertical="sm"` - Vertical padding only

---

## 🎨 Theme System

### Color Palette

**Surface Colors (Backgrounds):**
```javascript
theme.colors.surface.primary     // #006AA7 (Swedish blue)
theme.colors.surface.secondary   // #2A2A2A (Dark gray)
theme.colors.surface.tertiary    // #1A1A1A (App background)
theme.colors.surface.glass       // rgba(255, 255, 255, 0.1)
```

**Text Colors:**
```javascript
theme.colors.text.primary        // #FFFFFF (Main text)
theme.colors.text.secondary      // #CCCCCC (Secondary text)
theme.colors.text.tertiary       // #999999 (Muted text)
theme.colors.text.accent         // #FECC00 (Swedish yellow)
```

**Interactive Colors (Buttons):**
```javascript
theme.colors.interactive.primary    // #006AA7 (Primary buttons)
theme.colors.interactive.success    // #FECC00 (Success buttons)
theme.colors.interactive.danger     // #0066CC (Danger buttons)
```

### Spacing Scale
```javascript
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px  
theme.spacing.md    // 16px
theme.spacing.lg    // 24px
theme.spacing.xl    // 32px
theme.spacing.xxl   // 40px
theme.spacing.xxxl  // 56px
```

### Typography
```javascript
theme.typography.fonts.heading      // 'DrukWideBold'
theme.typography.fonts.body         // 'MonumentExtended-Regular'
theme.typography.fonts.bodyBold     // 'MonumentExtended-Ultrabold'
```

---

## 💡 Usage Examples

### Creating a Screen
```jsx
import { Container, Button, Text, Card } from '../ui';

export const MyScreen = () => (
  <Container variant="screen">
    <Container variant="content" paddingVertical="xl">
      
      {/* Header */}
      <Text variant="h1" color="primary" align="center">
        Welcome Back!
      </Text>
      
      <Text variant="body" color="secondary" align="center">
        Ready to check in?
      </Text>

      {/* Action Card */}
      <Card variant="glass" shadow="elevated">
        <Button variant="primary" size="lg" fullWidth>
          Start Check-In
        </Button>
      </Card>

      {/* Status */}
      <Container variant="row" justify="spaceBetween">
        <Text variant="bodySmall" color="tertiary">
          Last check-in: Yesterday
        </Text>
        <Text variant="bodySmall" color="success">
          On track!
        </Text>
      </Container>

    </Container>
  </Container>
);
```

### Creating a Form
```jsx
<Card variant="secondary" shadow="elevated">
  <Text variant="h3" color="primary" marginBottom="lg">
    Personal Info
  </Text>
  
  <Container variant="column" spacing="md">
    <Button variant="secondary" size="md" fullWidth>
      Edit Name
    </Button>
    
    <Button variant="ghost" size="md" fullWidth>
      Change Photo
    </Button>
    
    <Button variant="danger" size="sm">
      Delete Account
    </Button>
  </Container>
</Card>
```

### Creating Status Indicators
```jsx
<Container variant="row" spacing="sm">
  <Text variant="caption" color="success">
    ✅ Connected
  </Text>
  
  <Text variant="caption" color="warning">
    ⚠️ Check required
  </Text>
  
  <Text variant="caption" color="danger">
    ❌ Error
  </Text>
</Container>
```

---

## 🔄 Migration Guide

### Before (Old System)
```jsx
// Lots of repetitive StyleSheet code
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#006AA7',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    // ... 10+ more lines
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'DrukWideBold',
    letterSpacing: 2,
  }
});

<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>START CHECK-IN</Text>
</TouchableOpacity>
```

### After (New System)
```jsx
// Clean, semantic components
<Button variant="primary" size="xl">
  START CHECK-IN
</Button>
```

### Migration Steps
1. **Replace TouchableOpacity** → `<Button>`
2. **Replace Text with custom styles** → `<Text variant="..." color="...">`
3. **Replace View containers** → `<Container>` or `<Card>`
4. **Update color references** → Use semantic color names
5. **Replace spacing values** → Use theme spacing scale

---

## 🔧 Troubleshooting

### App Won't Start
**Problem:** `yarn start` shows "Command not found"

**Solution:**
```powershell
# Make sure you're in the right directory
cd apps/mobile

# Then start
yarn start
```

### Fonts Not Loading
**Problem:** Text shows system fonts instead of custom fonts

**Solutions:**
1. Check if font files exist in `assets/fonts/`
2. Run font linking: `npx react-native-asset`
3. Restart app completely

### Component Not Found
**Problem:** `Cannot find module '../ui'`

**Solution:**
```jsx
// Make sure import path is correct
import { Button, Text } from '../components/ui';

// Or check if you're in the right directory
import { Button, Text } from './ui';
```

### TypeScript Errors
**Problem:** Type errors with variants

**Solution:**
```jsx
// Make sure variant names match exactly
<Button variant="primary">  ✅ Correct
<Button variant="Primary">  ❌ Wrong case
<Button variant="blue">     ❌ Doesn't exist
```

### Colors Not Showing
**Problem:** Background colors appear black

**Solution:**
```jsx
// Import theme properly
import { theme } from '../styles/theme';

// Use theme colors
backgroundColor: theme.colors.surface.primary
```

---

## ✅ Best Practices

### Do's ✅
- **Use semantic variants**: `variant="primary"` instead of custom colors
- **Use theme spacing**: `padding="lg"` instead of pixel values
- **Combine components**: Use `<Container>` + `<Card>` + `<Button>` together
- **Test on multiple screen sizes**: Your components adapt automatically
- **Use consistent text hierarchy**: h1 → h2 → body → caption

### Don'ts ❌
- **Don't use inline styles**: `style={{backgroundColor: '#006AA7'}}` 
- **Don't mix old/new systems**: Pick one approach per component
- **Don't hardcode colors**: Use theme colors instead
- **Don't override component internals**: Use props instead
- **Don't nest too many containers**: Keep layout simple

### Performance Tips 🚀
- **Components are optimized**: Use them freely
- **Theme is cached**: No performance penalty
- **StyleSheet.create still works**: For custom one-offs
- **Animations are native**: Smooth 60fps performance

---

## 🎯 Quick Reference

### Most Common Patterns
```jsx
// Screen layout
<Container variant="screen">
  <Container variant="content" padding="lg">
    {/* content */}
  </Container>
</Container>

// Action button
<Button variant="primary" size="lg" fullWidth>
  Primary Action
</Button>

// Card with content
<Card variant="glass" shadow="elevated">
  <Text variant="h3" color="primary">Title</Text>
  <Text variant="body" color="secondary">Description</Text>
</Card>

// Status indicator
<Container variant="row">
  <Text variant="caption" color="success">✅ Active</Text>
</Container>
```

### Import Statement
```jsx
import { Button, Text, Card, Container } from '../components/ui';
import { theme } from '../styles/theme';
```

---

## 🆘 Need Help?

### Common Questions

**Q: Can I still use the old COLORS.PRIMARY?**
A: Yes! The old system works alongside the new one for compatibility.

**Q: How do I add a new color?**
A: Add it to `theme.colors` in `apps/mobile/src/styles/theme.ts`

**Q: Can I customize button sizes?**
A: Yes! Use the `style` prop to override: `<Button style={{minHeight: 80}} />`

**Q: How do I make text bold?**
A: Use `<Text variant="h1">` for headings or add `style={{fontWeight: 'bold'}}`

**Q: The styling demo isn't showing up**
A: Import it: `import {StylingDemo} from './StylingDemo'` and add `<StylingDemo />`

---

*🎨 **Your styling system is now professional-grade!** Use this manual as your reference for building beautiful, consistent UIs.* 