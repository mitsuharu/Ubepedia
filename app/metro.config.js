/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  // https://stackoverflow.com/questions/55622372/expo-sqlite-use-existing-database
  resolver: {
    assetExts: [
        ...defaultAssetExts,
        "db", 
        "sqlite", 
        "cjs"
    ]
  }
};
