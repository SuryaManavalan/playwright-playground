const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
  command: 'concurrently -k "npm --prefix frontend run dev" "npx tsx server/server.ts"',
  url: 'http://localhost:5173',
  reuseExistingServer: process.env.CI ? false : true,
  timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
