import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Theme Preset Type Definition
export interface ThemePreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  colors: {
    surface: {
      primary: string;
      secondary: string;
      tertiary: string;
      overlay: string;
      glass: string;
      success: string;
      warning: string;
      danger: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      accent: string;
      success: string;
      warning: string;
      danger: string;
    };
    border: {
      subtle: string;
      medium: string;
      strong: string;
      accent: string;
      success: string;
      warning: string;
      danger: string;
    };
    interactive: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      primaryDisabled: string;
      secondary: string;
      secondaryHover: string;
      secondaryActive: string;
      success: string;
      successHover: string;
      successActive: string;
      danger: string;
      dangerHover: string;
      dangerActive: string;
    };
  };
  typography: {
    fonts: {
      heading: string;
      body: string;
      bodyBold: string;
    };
    styles: {
      h1: { fontSize: number; fontFamily: string; letterSpacing: number };
      h2: { fontSize: number; fontFamily: string; letterSpacing: number };
      h3: { fontSize: number; fontFamily: string; letterSpacing: number };
      bodyLarge: { fontSize: number; fontFamily: string };
      body: { fontSize: number; fontFamily: string };
      bodySmall: { fontSize: number; fontFamily: string };
      caption: { fontSize: number; fontFamily: string };
      button: { fontSize: number; fontFamily: string; letterSpacing: number };
      buttonLarge: { fontSize: number; fontFamily: string; letterSpacing: number };
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  layout: {
    screenWidth: number;
    screenHeight: number;
    screenPadding: number;
    containerMaxWidth: number;
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      full: number;
    };
    breakpoints: {
      small: number;
      medium: number;
      large: number;
    };
  };
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
}

// 🇸🇪 PRESET 1: SWEDISH - Clean, geometric, professional
export const swedishTheme: ThemePreset = {
  id: 'swedish',
  name: 'Swedish',
  emoji: '🇸🇪',
  description: 'Clean & professional with Swedish flag colors',
  colors: {
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
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#999999',
      inverse: '#1A1A1A',
      accent: '#FECC00',        // Swedish yellow
      success: '#34C759',
      warning: '#FECC00',
      danger: '#FF3B30',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      strong: '#404040',
      accent: '#006AA7',
      success: 'rgba(52, 199, 89, 0.3)',
      warning: 'rgba(254, 204, 0, 0.3)',
      danger: 'rgba(0, 102, 204, 0.3)',
    },
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
    },
  },
  typography: {
    fonts: {
      heading: 'DrukWideBold',
      body: 'MonumentExtended-Regular',
      bodyBold: 'MonumentExtended-Ultrabold',
    },
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
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 56,
  },
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
    },
  },
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
};

// 🌍 PRESET 2: EARTH - Organic, imperfect, earth tones
export const earthTheme: ThemePreset = {
  id: 'earth',
  name: 'Earth',
  emoji: '🌍',
  description: 'Organic shapes & earth tones with imperfect design',
  colors: {
    surface: {
      primary: '#8B4513',       // Saddle brown
      secondary: '#2F1B14',     // Dark chocolate
      tertiary: '#1C1309',     // Very dark brown
      overlay: 'rgba(139, 69, 19, 0.8)',
      glass: 'rgba(205, 133, 63, 0.2)',
      success: 'rgba(107, 142, 35, 0.2)',
      warning: 'rgba(218, 165, 32, 0.2)',
      danger: 'rgba(160, 82, 45, 0.2)',
    },
    text: {
      primary: '#F5DEB3',       // Wheat
      secondary: '#DEB887',     // Burlywood
      tertiary: '#D2B48C',     // Tan
      inverse: '#2F1B14',
      accent: '#DAA520',        // Goldenrod
      success: '#6B8E23',       // Olive drab
      warning: '#DAA520',
      danger: '#CD853F',        // Peru
    },
    border: {
      subtle: 'rgba(245, 222, 179, 0.15)',
      medium: 'rgba(245, 222, 179, 0.25)',
      strong: '#8B7355',
      accent: '#8B4513',
      success: 'rgba(107, 142, 35, 0.4)',
      warning: 'rgba(218, 165, 32, 0.4)',
      danger: 'rgba(160, 82, 45, 0.4)',
    },
    interactive: {
      primary: '#8B4513',
      primaryHover: '#A0522D',
      primaryActive: '#654321',
      primaryDisabled: 'rgba(139, 69, 19, 0.4)',
      secondary: 'rgba(245, 222, 179, 0.15)',
      secondaryHover: 'rgba(245, 222, 179, 0.2)',
      secondaryActive: 'rgba(245, 222, 179, 0.1)',
      success: '#6B8E23',
      successHover: '#7BA428',
      successActive: '#556B1E',
      danger: '#A0522D',
      dangerHover: '#B8633A',
      dangerActive: '#8B4226',
    },
  },
  typography: {
    fonts: {
      heading: 'DrukWideBold',
      body: 'MonumentExtended-Regular',
      bodyBold: 'MonumentExtended-Ultrabold',
    },
    styles: {
      h1: { fontSize: 34, fontFamily: 'DrukWideBold', letterSpacing: 1 }, // Slightly larger, less spacing
      h2: { fontSize: 26, fontFamily: 'DrukWideBold', letterSpacing: 0.5 },
      h3: { fontSize: 21, fontFamily: 'DrukWideBold', letterSpacing: 0 },
      bodyLarge: { fontSize: 19, fontFamily: 'MonumentExtended-Regular' },
      body: { fontSize: 17, fontFamily: 'MonumentExtended-Regular' },
      bodySmall: { fontSize: 15, fontFamily: 'MonumentExtended-Regular' },
      caption: { fontSize: 13, fontFamily: 'MonumentExtended-Regular' },
      button: { fontSize: 17, fontFamily: 'MonumentExtended-Ultrabold', letterSpacing: 0.5 },
      buttonLarge: { fontSize: 21, fontFamily: 'DrukWideBold', letterSpacing: 1 },
    },
  },
  spacing: {
    xs: 5,    // Slightly irregular
    sm: 9,
    md: 17,
    lg: 25,
    xl: 33,
    xxl: 41,
    xxxl: 57,
  },
  layout: {
    screenWidth: width,
    screenHeight: height,
    screenPadding: 26, // Irregular
    containerMaxWidth: 485,
    borderRadius: {
      sm: 6,    // Less perfect
      md: 14,
      lg: 22,
      full: 9999,
    },
    breakpoints: {
      small: 375,
      medium: 414,
      large: 768,
    },
  },
  shadows: {
    small: {
      shadowColor: "#2F1B14",
      shadowOffset: { width: 1, height: 3 }, // Slightly off-center
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
    },
    medium: {
      shadowColor: "#2F1B14",
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.25,
      shadowRadius: 9,
      elevation: 5,
    },
    large: {
      shadowColor: "#2F1B14",
      shadowOffset: { width: 3, height: 9 },
      shadowOpacity: 0.3,
      shadowRadius: 17,
      elevation: 8,
    },
  },
};

// ☁️ PRESET 3: DREAMY - Soft pastels, bubblegum, cushioned
export const dreamyTheme: ThemePreset = {
  id: 'dreamy',
  name: 'Dreamy',
  emoji: '☁️',
  description: 'Soft pastels & bubblegum with cushioned experience',
  colors: {
    surface: {
      primary: '#DDA0DD',       // Plum
      secondary: '#E6E6FA',     // Lavender
      tertiary: '#F8F8FF',     // Ghost white
      overlay: 'rgba(221, 160, 221, 0.8)',
      glass: 'rgba(255, 182, 193, 0.3)',
      success: 'rgba(152, 251, 152, 0.3)',
      warning: 'rgba(255, 218, 185, 0.3)',
      danger: 'rgba(255, 182, 193, 0.3)',
    },
    text: {
      primary: '#483D8B',       // Dark slate blue
      secondary: '#9370DB',     // Medium purple
      tertiary: '#BA55D3',     // Medium orchid
      inverse: '#F8F8FF',
      accent: '#FF69B4',        // Hot pink
      success: '#98FB98',       // Pale green
      warning: '#FFDAB9',       // Peach puff
      danger: '#FFB6C1',        // Light pink
    },
    border: {
      subtle: 'rgba(221, 160, 221, 0.2)',
      medium: 'rgba(221, 160, 221, 0.3)',
      strong: '#DDA0DD',
      accent: '#FF69B4',
      success: 'rgba(152, 251, 152, 0.5)',
      warning: 'rgba(255, 218, 185, 0.5)',
      danger: 'rgba(255, 182, 193, 0.5)',
    },
    interactive: {
      primary: '#DDA0DD',
      primaryHover: '#E6B8E6',
      primaryActive: '#D088D0',
      primaryDisabled: 'rgba(221, 160, 221, 0.4)',
      secondary: 'rgba(255, 105, 180, 0.2)',
      secondaryHover: 'rgba(255, 105, 180, 0.3)',
      secondaryActive: 'rgba(255, 105, 180, 0.1)',
      success: '#98FB98',
      successHover: '#ADFFAD',
      successActive: '#7FE97F',
      danger: '#FFB6C1',
      dangerHover: '#FFC0CB',
      dangerActive: '#FFA0B4',
    },
  },
  typography: {
    fonts: {
      heading: 'DrukWideBold',
      body: 'MonumentExtended-Regular',
      bodyBold: 'MonumentExtended-Ultrabold',
    },
    styles: {
      h1: { fontSize: 36, fontFamily: 'DrukWideBold', letterSpacing: 3 }, // More cushioned
      h2: { fontSize: 28, fontFamily: 'DrukWideBold', letterSpacing: 2 },
      h3: { fontSize: 22, fontFamily: 'DrukWideBold', letterSpacing: 1.5 },
      bodyLarge: { fontSize: 20, fontFamily: 'MonumentExtended-Regular' },
      body: { fontSize: 18, fontFamily: 'MonumentExtended-Regular' },
      bodySmall: { fontSize: 16, fontFamily: 'MonumentExtended-Regular' },
      caption: { fontSize: 14, fontFamily: 'MonumentExtended-Regular' },
      button: { fontSize: 18, fontFamily: 'MonumentExtended-Ultrabold', letterSpacing: 2 },
      buttonLarge: { fontSize: 24, fontFamily: 'DrukWideBold', letterSpacing: 3 },
    },
  },
  spacing: {
    xs: 6,    // More generous
    sm: 12,
    md: 20,
    lg: 28,
    xl: 36,
    xxl: 44,
    xxxl: 60,
  },
  layout: {
    screenWidth: width,
    screenHeight: height,
    screenPadding: 28, // More padding
    containerMaxWidth: 500,
    borderRadius: {
      sm: 12,   // Much more rounded
      md: 20,
      lg: 28,
      full: 9999,
    },
    breakpoints: {
      small: 375,
      medium: 414,
      large: 768,
    },
  },
  shadows: {
    small: {
      shadowColor: "#DDA0DD",
      shadowOffset: { width: 0, height: 4 }, // Softer shadows
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    medium: {
      shadowColor: "#DDA0DD",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 6,
    },
    large: {
      shadowColor: "#DDA0DD",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 10,
    },
  },
};

// Available theme presets
export const THEME_PRESETS = [
  swedishTheme,
  earthTheme,
  dreamyTheme,
];

// Default theme (Swedish)
export const defaultTheme = swedishTheme; 