import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, LAYOUT, SHADOWS } from '../../styles/theme';
import { CheckInFlow } from '../CheckInFlow/CheckInFlow';
import { HealthKitButton } from '../HealthKitButton';
import { isInCheckInWindow, getNextCheckInDay } from '@who-cares/config';

const getCheckInStatus = () => {
  const { isOpen, timeRemaining } = isInCheckInWindow();
  
  if (!isOpen) {
    return {
      color: COLORS.DANGER,
      message: `check-in closed, come back in ${getNextCheckInDay()} days`,
    };
  }

  if (timeRemaining <= 1) {
    return {
      color: COLORS.WARNING,
      message: '1 hour left!',
    };
  }

  return {
    color: COLORS.SUCCESS,
    message: "check-in is open!",
  };
};

export const Home: React.FC = () => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const status = useMemo(() => getCheckInStatus(), []);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const checkInWindow = useMemo(() => isInCheckInWindow(), []);

  useEffect(() => {
    if (!checkInWindow.isOpen) return;

    const createPulseAnimation = () => {
      return Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.05,
          duration: checkInWindow.timeRemaining <= 1 ? 500 : 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: checkInWindow.timeRemaining <= 1 ? 500 : 1000,
          useNativeDriver: true,
        })
      ]);
    };

    const pulseAnimation = Animated.loop(createPulseAnimation());
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [checkInWindow.isOpen, checkInWindow.timeRemaining]);

  const handleStartCheckIn = () => {
    setShowCheckIn(true);
  };

  const handleCloseCheckIn = () => {
    setShowCheckIn(false);
  };

  if (showCheckIn) {
    return <CheckInFlow onClose={handleCloseCheckIn} />;
  }

  const buttonColor = checkInWindow.isOpen
    ? checkInWindow.timeRemaining <= 1
      ? COLORS.WARNING
      : COLORS.SUCCESS
    : COLORS.GRAY;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: buttonColor }]}
            onPress={handleStartCheckIn}
            disabled={!checkInWindow.isOpen}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>START CHECK-IN</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.healthKitButtonContainer}>
          <HealthKitButton />
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: status.color }]} />
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusMessage}>{status.message}</Text>
          <Text style={styles.statusDate}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthKitButtonContainer: {
    marginTop: SPACING.XL,
  },
  startButton: {
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    borderRadius: LAYOUT.BORDER_RADIUS.MD,
    ...SHADOWS.MEDIUM,
  },
  startButtonText: {
    color: COLORS.BLACK,
    fontSize: 20,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    letterSpacing: 2,
  },
  statusContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 44 : 24,
    left: SPACING.LG,
    right: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    padding: SPACING.MD,
    borderRadius: LAYOUT.BORDER_RADIUS.LG,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.MD,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusMessage: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    opacity: 0.9,
    marginBottom: 2,
  },
  statusDate: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    opacity: 0.6,
  },
}); 