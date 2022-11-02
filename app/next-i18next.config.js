const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'es'],
    localePath: path.resolve('./public/locales'),
  },
};
