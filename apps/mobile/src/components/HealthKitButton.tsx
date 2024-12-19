import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, Platform, View } from 'react-native';
import { COLORS, FONTS, SPACING, LAYOUT } from '../styles/theme';
import HealthKitService from '../services/HealthKitService';

interface HealthStats {
  avgSleep: number;
  avgSteps: number;
}

const HealthKitButton: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<HealthStats | null>(null);

  const fetchHealthStats = useCallback(async () => {
    try {
      const healthData = await HealthKitService.getWeeklyHealthData();
      if (healthData) {
        const totalSleepHours = healthData.sleepData.reduce((total: number, sample: { startDate: string; endDate: string }) => {
          const start = new Date(sample.startDate).getTime();
          const end = new Date(sample.endDate).getTime();
          return total + (end - start) / (1000 * 60 * 60);
        }, 0);
        const avgSleep = totalSleepHours / 7;

        const totalSteps = healthData.stepsData.reduce((total: number, sample: { value: number }) => total + sample.value, 0);
        const avgSteps = totalSteps / 7;

        setStats({ avgSleep, avgSteps });
      }
    } catch (error) {
      console.error('Failed to fetch health stats:', error);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchHealthStats();
    }
  }, [isConnected, fetchHealthStats]);

  const handleConnect = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Not Available', 'HealthKit is only available on iOS devices.');
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      const authorized = await HealthKitService.requestAuthorization();
      
      if (authorized) {
        setIsConnected(true);
        await fetchHealthStats();
      } else {
        Alert.alert(
          'Permission Denied',
          'Please enable Health permissions in your device settings to earn bonus points.'
        );
      }
    } catch (error) {
      console.error('HealthKit Error:', error);
      Alert.alert('Connection Failed', 'Unable to connect to HealthKit. Please try again.');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, fetchHealthStats]);

  if (isConnected && stats) {
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.avgSleep.toFixed(1)}h</Text>
          <Text style={styles.statLabel}>Avg Sleep</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.round(stats.avgSteps).toLocaleString()}</Text>
          <Text style={styles.statLabel}>Avg Steps</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.loadingButton]}
      onPress={handleConnect}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text style={styles.text}>
        {isLoading ? '🔄 Connecting...' : '🔗❤️ Connect Health'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderRadius: LAYOUT.BORDER_RADIUS.LG,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loadingButton: {
    opacity: 0.7,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTS.MONUMENT_EXTENDED_BOLD,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    borderColor: 'rgba(52, 199, 89, 0.3)',
    borderWidth: 1,
    borderRadius: LAYOUT.BORDER_RADIUS.LG,
    padding: SPACING.MD,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: FONTS.MONUMENT_EXTENDED_BOLD,
    marginBottom: SPACING.XS,
  },
  statLabel: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    opacity: 0.7,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: SPACING.MD,
  },
});

export { HealthKitButton };