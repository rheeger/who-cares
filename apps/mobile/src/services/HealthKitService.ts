import { Platform, NativeModules } from 'react-native';

const { HealthKitBridge } = NativeModules;

interface HealthValue {
  startDate: string;
  endDate: string;
  value: number;
}

const STALE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

class HealthKitService {
  private static instance: HealthKitService;
  private lastFetch: { [key: string]: number } = {};
  private cachedData: { [key: string]: any } = {};
  private isInitialized: boolean = false;
  private authorizationStatus: 'unknown' | 'authorized' | 'denied' | 'error' = 'unknown';

  private constructor() {}

  static getInstance(): HealthKitService {
    if (!HealthKitService.instance) {
      HealthKitService.instance = new HealthKitService();
    }
    return HealthKitService.instance;
  }

  async requestAuthorization(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      this.authorizationStatus = 'denied';
      return false;
    }
    
    if (this.isInitialized && this.authorizationStatus === 'authorized') {
      return true;
    }

    try {
      const authorized = await HealthKitBridge.requestAuthorization();
      this.authorizationStatus = authorized ? 'authorized' : 'denied';
      
      if (authorized) {
        this.isInitialized = true;
        console.log('[HealthKitService] HealthKit setup was successful');
      } else {
        console.log('[HealthKitService] HealthKit authorization was denied');
      }
      
      return authorized;
    } catch (error) {
      this.authorizationStatus = 'error';
      this.isInitialized = false;
      console.error('[HealthKitService] Error requesting authorization:', error);
      throw new Error('Failed to request HealthKit authorization');
    }
  }

  private isStale(key: string): boolean {
    const lastFetchTime = this.lastFetch[key];
    return !lastFetchTime || Date.now() - lastFetchTime > STALE_TIMEOUT;
  }

  async getWeeklyHealthData() {
    if (!this.isInitialized || this.authorizationStatus !== 'authorized') {
      try {
        const authorized = await this.requestAuthorization();
        if (!authorized) {
          console.log('[HealthKitService] Not authorized to access HealthKit data');
          return null;
        }
      } catch (error) {
        console.error('[HealthKitService] Authorization error:', error);
        return null;
      }
    }

    if (!this.isStale('weeklyData') && this.cachedData['weeklyData']) {
      return this.cachedData['weeklyData'];
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    try {
      const [sleepData, stepsData] = await Promise.all([
        this.getWeeklySleepData(startDate, endDate),
        this.getWeeklyStepsData(startDate, endDate),
      ]);

      const result = {
        sleepData: sleepData || [],
        stepsData: stepsData || [],
        bonusPoints: this.calculateBonusPoints(sleepData || [], stepsData || []),
      };

      this.cachedData['weeklyData'] = result;
      this.lastFetch['weeklyData'] = Date.now();

      return result;
    } catch (error) {
      console.error('[HealthKitService] Failed to fetch health data:', error);
      return null;
    }
  }

  private async getWeeklySleepData(startDate: Date, endDate: Date): Promise<HealthValue[]> {
    try {
      return await HealthKitBridge.getSleepData(
        startDate.toISOString(),
        endDate.toISOString()
      ) || [];
    } catch (error) {
      console.error('[HealthKitService] Failed to fetch sleep data:', error);
      return [];
    }
  }

  private async getWeeklyStepsData(startDate: Date, endDate: Date): Promise<HealthValue[]> {
    try {
      return await HealthKitBridge.getStepCount(
        startDate.toISOString(),
        endDate.toISOString()
      ) || [];
    } catch (error) {
      console.error('[HealthKitService] Failed to fetch step data:', error);
      return [];
    }
  }

  private calculateBonusPoints(sleepData: HealthValue[], stepsData: HealthValue[]): number {
    let bonusPoints = 0;

    // Calculate average sleep duration
    const totalSleepHours = sleepData.reduce((total, sample) => {
      const start = new Date(sample.startDate).getTime();
      const end = new Date(sample.endDate).getTime();
      return total + (end - start) / (1000 * 60 * 60); // Convert to hours
    }, 0);
    const avgSleepHours = totalSleepHours / 7;

    // Calculate average steps
    const totalSteps = stepsData.reduce((total, sample) => total + sample.value, 0);
    const avgSteps = totalSteps / 7;

    // Award bonus points based on criteria from ABOUT.md
    if (avgSleepHours >= 7) bonusPoints += 1;
    if (avgSteps >= 10000) bonusPoints += 1;

    return bonusPoints;
  }
}

export default HealthKitService.getInstance();