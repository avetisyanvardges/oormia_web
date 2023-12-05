const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: [ 'en', 'ru', 'hy'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  trailingSlash: true,
}

module.exports = nextConfig
