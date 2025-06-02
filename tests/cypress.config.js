const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 1500,
  video: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'command.js',
    specPattern: ['integration.test.js'],
  },
});
