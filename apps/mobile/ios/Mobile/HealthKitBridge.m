#import "HealthKitBridge.h"

@implementation HealthKitBridge

RCT_EXPORT_MODULE();

- (instancetype)init {
    self = [super init];
    if (self) {
        self.healthStore = [[HKHealthStore alloc] init];
    }
    return self;
}

RCT_EXPORT_METHOD(requestAuthorization:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (![HKHealthStore isHealthDataAvailable]) {
        reject(@"health_data_unavailable", @"HealthKit is not available on this device", nil);
        return;
    }

    NSSet *readTypes = [NSSet setWithObjects:
        [HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount],
        [HKObjectType categoryTypeForIdentifier:HKCategoryTypeIdentifierSleepAnalysis],
        nil];

    dispatch_async(dispatch_get_main_queue(), ^{
        [self.healthStore requestAuthorizationToShareTypes:nil
                                               readTypes:readTypes
                                              completion:^(BOOL success, NSError *error) {
            if (success) {
                resolve(@YES);
            } else {
                NSString *errorMessage = error ? error.localizedDescription : @"Failed to get authorization";
                reject(@"authorization_error", errorMessage, error);
            }
        }];
    });
}

RCT_EXPORT_METHOD(getStepCount:(NSString *)startDateString
                  endDateString:(NSString *)endDateString
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
    
    NSDate *startDate = [dateFormatter dateFromString:startDateString];
    NSDate *endDate = [dateFormatter dateFromString:endDateString];
    
    if (!startDate || !endDate) {
        reject(@"invalid_date", @"Invalid date format", nil);
        return;
    }
    
    HKQuantityType *stepCountType = [HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
    
    NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate
                                                              endDate:endDate
                                                              options:HKQueryOptionStrictStartDate];
    
    NSDateComponents *interval = [[NSDateComponents alloc] init];
    interval.day = 1;
    
    HKStatisticsCollectionQuery *query = [[HKStatisticsCollectionQuery alloc]
        initWithQuantityType:stepCountType
        quantitySamplePredicate:predicate
        options:HKStatisticsOptionCumulativeSum
        anchorDate:startDate
        intervalComponents:interval];
    
    query.initialResultsHandler = ^(HKStatisticsCollectionQuery *query,
                                  HKStatisticsCollection *result,
                                  NSError *error) {
        if (error) {
            reject(@"step_count_error", error.localizedDescription, error);
            return;
        }
        
        NSMutableArray *data = [NSMutableArray array];
        [result enumerateStatisticsFromDate:startDate
                                   toDate:endDate
                                withBlock:^(HKStatistics *statistics, BOOL *stop) {
            HKQuantity *quantity = statistics.sumQuantity;
            if (quantity) {
                double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
                NSDictionary *entry = @{
                    @"startDate": [dateFormatter stringFromDate:statistics.startDate],
                    @"endDate": [dateFormatter stringFromDate:statistics.endDate],
                    @"value": @(value)
                };
                [data addObject:entry];
            }
        }];
        
        resolve(data);
    };
    
    [self.healthStore executeQuery:query];
}

RCT_EXPORT_METHOD(getSleepData:(NSString *)startDateString
                  endDateString:(NSString *)endDateString
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
    
    NSDate *startDate = [dateFormatter dateFromString:startDateString];
    NSDate *endDate = [dateFormatter dateFromString:endDateString];
    
    if (!startDate || !endDate) {
        reject(@"invalid_date", @"Invalid date format", nil);
        return;
    }
    
    HKCategoryType *sleepType = [HKObjectType categoryTypeForIdentifier:HKCategoryTypeIdentifierSleepAnalysis];
    NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate
                                                              endDate:endDate
                                                              options:HKQueryOptionStrictStartDate];
    
    HKSampleQuery *query = [[HKSampleQuery alloc]
        initWithSampleType:sleepType
        predicate:predicate
        limit:HKObjectQueryNoLimit
        sortDescriptors:@[[NSSortDescriptor sortDescriptorWithKey:HKSampleSortIdentifierStartDate ascending:YES]]
        resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
            if (error) {
                reject(@"sleep_data_error", error.localizedDescription, error);
                return;
            }
            
            NSMutableArray *data = [NSMutableArray array];
            for (HKCategorySample *sample in results) {
                if (sample.value == HKCategoryValueSleepAnalysisAsleep ||
                    sample.value == HKCategoryValueSleepAnalysisInBed) {
                    NSDictionary *entry = @{
                        @"startDate": [dateFormatter stringFromDate:sample.startDate],
                        @"endDate": [dateFormatter stringFromDate:sample.endDate],
                        @"value": @(sample.value)
                    };
                    [data addObject:entry];
                }
            }
            
            resolve(data);
        }];
    
    [self.healthStore executeQuery:query];
}

@end 