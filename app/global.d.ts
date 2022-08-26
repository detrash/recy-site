// Use type safe message keys with `next-intl`
type Messages = typeof import('./src/modules/home/i18n/en.json');
declare interface IntlMessages extends Messages {}
