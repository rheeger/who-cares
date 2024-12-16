export type Environment = 'development' | 'staging' | 'production';

export const getEnvironment = (): Environment => {
  // For Node.js environments
  if (typeof process !== 'undefined' && process.env['NODE_ENV']) {
    return process.env['NODE_ENV'] as Environment;
  }
  
  // For Expo/React Native environments
  if (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_ENV']) {
    return process.env['EXPO_PUBLIC_ENV'] as Environment;
  }
  
  // Default to development
  return 'development';
};

export interface CheckInWindow {
  isAlwaysOpen: boolean;
  allowedDays: readonly number[];
  startHour: number;
  endHour: number;
}

export const ENV_CONFIG = {
  development: {
    checkInWindow: {
      isAlwaysOpen: true,
      allowedDays: [0, 1, 2, 3, 4, 5, 6], // All days
      startHour: 0,
      endHour: 23,
    },
  },
  staging: {
    checkInWindow: {
      isAlwaysOpen: false,
      allowedDays: [0], // Sunday only
      startHour: 0,
      endHour: 23,
    },
  },
  production: {
    checkInWindow: {
      isAlwaysOpen: false,
      allowedDays: [0], // Sunday only
      startHour: 0,
      endHour: 23,
    },
  },
} as const;

export const getCheckInWindow = (): CheckInWindow => {
  const config = ENV_CONFIG[getEnvironment()].checkInWindow;
  return {
    ...config,
    allowedDays: [...config.allowedDays]
  };
};

export const isInCheckInWindow = (): { isOpen: boolean; timeRemaining: number } => {
  const window = getCheckInWindow();
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();

  if (window.isAlwaysOpen) {
    return { isOpen: true, timeRemaining: 24 };
  }

  const isDayAllowed = window.allowedDays.includes(currentDay);
  if (!isDayAllowed) {
    return { isOpen: false, timeRemaining: 0 };
  }

  const isTimeAllowed = currentHour >= window.startHour && currentHour <= window.endHour;
  if (!isTimeAllowed) {
    return { isOpen: false, timeRemaining: 0 };
  }

  const hoursRemaining = window.endHour - currentHour;
  return { isOpen: true, timeRemaining: hoursRemaining };
};

export const getNextCheckInDay = (): number => {
  const window = getCheckInWindow();
  if (window.isAlwaysOpen) return 0;

  const today = new Date().getDay();
  const nextAllowedDay = window.allowedDays.find(day => day > today) ?? window.allowedDays[0];
  const daysUntilNext = nextAllowedDay > today ? 
    nextAllowedDay - today : 
    7 - today + nextAllowedDay;

  return daysUntilNext;
}; 