module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = process.env.NODE_ENV === "test";

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          web: {
            unstable_transformImportMeta: true,
          },
        },
      ],
      "nativewind/babel",
    ],
    plugins: isTest ? [] : ["react-native-reanimated/plugin"],
  };
};
