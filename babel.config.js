module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = process.env.NODE_ENV === "test";

  return {
    presets: ["babel-preset-expo"],
    plugins: isTest
      ? []
      : ["expo-router/babel", "nativewind/babel", "react-native-reanimated/plugin"],
  };
};
