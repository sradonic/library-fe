// jest.config.js
module.exports = {
    transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "^axios$": "<rootDir>/src/__mocks__/axios.js",

    },
    testEnvironment: "jsdom"
  };
  