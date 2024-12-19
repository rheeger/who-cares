module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  dependencies: {
    'HealthKitBridge': {
      platforms: {
        ios: null, // This means it will use the ios folder in the root
      },
    },
  },
}; 