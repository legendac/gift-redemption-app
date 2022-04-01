module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom'
}