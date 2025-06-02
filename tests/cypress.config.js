const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 1500,
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'command.js',
    specPattern: ['smoke.test.js'],
  },
});
