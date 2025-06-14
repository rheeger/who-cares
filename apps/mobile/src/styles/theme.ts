import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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