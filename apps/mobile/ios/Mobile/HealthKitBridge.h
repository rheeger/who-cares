#import <React/RCTBridgeModule.h>
#import <HealthKit/HealthKit.h>

@interface HealthKitBridge : NSObject <RCTBridgeModule>

@property (nonatomic, strong) HKHealthStore *healthStore;

@end