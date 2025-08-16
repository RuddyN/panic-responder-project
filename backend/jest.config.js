// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ['<rootDir>/dist/']
  // If needed, to transform specific node_modules:
  // transformIgnorePatterns: ['/node_modules/(?!(your-esm-library)/)'],
};
