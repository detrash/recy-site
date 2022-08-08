export const UTIL_LINKS = {
  BUY_RECY_URL: 'https://www.detrash.org/',
  DETRASH_APP_URL: 'http://detrash.vercel.app/',
  TOKEN_CONTRACT_URL:
    'https://explorer.celo.org/token/0x34C11A932853Ae24E845Ad4B633E3cEf91afE583',
  WHITEPAPER_URL:
    'https://drive.google.com/file/d/1uAUCRwMjmjFOS-0XHziC9bSBf5_udLew/view?usp=sharing',
};

type NavPageProps = {
  name: 'privacyPolicy' | 'recy' | 'roadmap' | 'team';
  path: string;
};

export const NAV_PAGES: NavPageProps[] = [
  {
    name: 'recy',
    path: '/recy',
  },
  {
    name: 'roadmap',
    path: '/roadmap',
  },
  {
    name: 'team',
    path: '/team',
  },
];
