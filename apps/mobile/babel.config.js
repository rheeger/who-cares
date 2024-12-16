module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@who-cares/config': '../../libs/config/src/index.ts',
          'assets': './src/assets',
        },
      },
    ],
  ],
};
