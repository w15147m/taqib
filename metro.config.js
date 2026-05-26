const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'sql'),
    sourceExts: [...sourceExts, 'sql'],
    // Enable package exports for modern libraries like Drizzle
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(defaultConfig, config);
