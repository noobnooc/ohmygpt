/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    // Export envs to browser side
    appName: process.env.APP_NAME,
    appLogo: process.env.APP_LOGO,
    appSummary: process.env.APP_SUMMARY,
    appThemeColor: process.env.APP_THEME_COLOR,
    exampleInput: process.env.EXAMPLE_INPUT,
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  reactStrictMode: true,
};
