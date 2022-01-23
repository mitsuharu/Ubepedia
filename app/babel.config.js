module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["./"],
      alias: {
        "@": "./src",
        "@images": "./images",
        "@assets": "./assets",
      },
      extensions: [
        ".js",
      ]
    }],
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
  ],
  env: {
    production: {
      plugins: [
        "transform-remove-console", 
      ]
    }
  }
};
