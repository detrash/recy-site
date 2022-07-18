export const UTIL_LINKS = {
  BUY_RECY_URL:
    'https://api.whatsapp.com/send?phone=5571982640517&text=Ol%C3%A1!%20Vi%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20detalhes%20sobre%20o%20Detrash%20Token!!',
  DETRASH_APP_URL: 'http://detrash.vercel.app/',
  TOKEN_CONTRACT_URL:
    'https://explorer.celo.org/token/0x34C11A932853Ae24E845Ad4B633E3cEf91afE583',
  WHITEPAPER_URL:
    'https://drive.google.com/file/d/1k4jFIni3IEIuyTmTA3wC2Au_8JQHtA2c/view?usp=sharing',
};

type NavPageProps = {
  name: 'privacyPolicy' | 'recy' | 'roadmap' | 'team';
  path: string;
};

export const NAV_PAGES: NavPageProps[] = [
  {
    name: 'recy',
    path: 'recy',
  },
  {
    name: 'roadmap',
    path: 'roadmap',
  },
  {
    name: 'team',
    path: 'team',
  },
  {
    name: 'privacyPolicy',
    path: 'privacy-policy',
  },
];
