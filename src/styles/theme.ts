import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Legacy colors (keep for backward compatibility)
export const COLORS = {
  PRIMARY: '#006AA7',        // Swedish flag blue
  WARNING: '#FECC00',        // Swedish flag yellow  
  DANGER: '#0066CC',         // Darker Swedish blue for alerts
  SUCCESS: '#FECC00',        // Swedish flag yellow for success
  WHITE: '#FFFFFF',
  BLACK: '#1A1A1A',
  GRAY: '#666666',
  TRANSPARENT_WHITE: 'rgba(255, 255, 255, 0.95)',
  TRANSPARENT_BLACK: 'rgba(0, 0, 0, 0.2)',
};

// Enhanced semantic token system
export const theme = {
  colors: {
    // Surface colors (backgrounds, cards, containers)
    surface: {
      primary: '#006AA7',       // Swedish blue
      secondary: '#2A2A2A',     // Dark gray
      tertiary: '#1A1A1A',     // App background
      overlay: 'rgba(0, 0, 0, 0.8)',
      glass: 'rgba(255, 255, 255, 0.1)',
      success: 'rgba(52, 199, 89, 0.15)',
      warning: 'rgba(254, 204, 0, 0.15)',
      danger: 'rgba(0, 102, 204, 0.15)',
    },
    
    // Text colors (hierarchy and states)
    text: {
      primary: '#FFFFFF',       // Main text
      secondary: '#CCCCCC',     // Secondary text
      tertiary: '#999999',      // Muted text
      inverse: '#1A1A1A',      // Text on light backgrounds
      accent: '#FECC00',        // Swedish yellow for highlights
      success: '#34C759',
      warning: '#FECC00',
      danger: '#FF3B30',
    },
    
    // Border colors (separators, outlines)
    border: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      strong: '#404040',
      accent: '#006AA7',
      success: 'rgba(52, 199, 89, 0.3)',
      warning: 'rgba(254, 204, 0, 0.3)',
      danger: 'rgba(0, 102, 204, 0.3)',
    },
    
    // Interactive states
    interactive: {
      primary: '#006AA7',
      primaryHover: '#0077C2',
      primaryActive: '#005A94',
      primaryDisabled: 'rgba(0, 106, 167, 0.4)',
      
      secondary: 'rgba(255, 255, 255, 0.1)',
      secondaryHover: 'rgba(255, 255, 255, 0.15)',
      secondaryActive: 'rgba(255, 255, 255, 0.05)',
      
      success: '#FECC00',
      successHover: '#FFD633',
      successActive: '#E6B800',
      
      danger: '#0066CC',
      dangerHover: '#0077DD',
      dangerActive: '#0055BB',
    }
  },
  
  // Typography system
  typography: {
    // Font families
    fonts: {
      heading: 'DrukWideBold',
      body: 'MonumentExtended-Regular',
      bodyBold: 'MonumentExtended-Ultrabold',
    },
    
    // Text styles
    styles: {
      h1: { fontSize: 32, fontFamily: 'DrukWideBold', letterSpacing: 2 },
      h2: { fontSize: 24, fontFamily: 'DrukWideBold', letterSpacing: 1.5 },
      h3: { fontSize: 20, fontFamily: 'DrukWideBold', letterSpacing: 1 },
      
      bodyLarge: { fontSize: 18, fontFamily: 'MonumentExtended-Regular' },
      body: { fontSize: 16, fontFamily: 'MonumentExtended-Regular' },
      bodySmall: { fontSize: 14, fontFamily: 'MonumentExtended-Regular' },
      caption: { fontSize: 12, fontFamily: 'MonumentExtended-Regular' },
      
      button: { fontSize: 16, fontFamily: 'MonumentExtended-Ultrabold', letterSpacing: 1 },
      buttonLarge: { fontSize: 20, fontFamily: 'DrukWideBold', letterSpacing: 2 },
    }
  },
  
  // Spacing system (enhanced)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 56,
  },
  
  // Layout system
  layout: {
    screenWidth: width,
    screenHeight: height,
    screenPadding: 24,
    containerMaxWidth: 480,
    
    borderRadius: {
      sm: 8,
      md: 16,
      lg: 24,
      full: 9999,
    },
    
    breakpoints: {
      small: 375,
      medium: 414,
      large: 768,
    }
  },
  
  // Enhanced shadows
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Animation presets
  animations: {
    timing: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    
    easing: {
      easeOut: 'ease-out',
      easeIn: 'ease-in',
      easeInOut: 'ease-in-out',
    },
    
    presets: {
      fadeIn: { opacity: [0, 1], duration: 300 },
      slideUp: { translateY: [50, 0], duration: 400 },
      scale: { scale: [0.95, 1], duration: 200 },
      pulse: { scale: [1, 1.05, 1], duration: 1000 },
    }
  }
};

// Legacy exports (keep for backward compatibility)
export const FONTS = {
  DRUK_WIDE_BOLD: 'DrukWideBold',
  MONUMENT_EXTENDED: 'MonumentExtended-Regular',
  MONUMENT_EXTENDED_BOLD: 'MonumentExtended-Ultrabold',
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
};

export const LAYOUT = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  SCREEN_PADDING: 24,
  BORDER_RADIUS: {
    SM: 8,
    MD: 16,
    LG: 24,
  },
};

export const SHADOWS = {
  SMALL: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  MEDIUM: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const TEXT_SHADOWS = {
  SMALL: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  MEDIUM: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
}; 