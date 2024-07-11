export const UTIL_LINKS = {
  APP_URL: "https://app.recy.life",
  BUY_RECY_URL:
    "https://app.uniswap.org/swap?chain=celo&inputCurrency=0x765DE816845861e75A25fCA122bb6898B8B1282a&outputCurrency=0x34C11A932853Ae24E845Ad4B633E3cEf91afE583",
  DETRASH_APP_URL: "http://detrash.vercel.app/",
  TOKEN_CONTRACT_URL:
    "https://explorer.celo.org/token/0x34C11A932853Ae24E845Ad4B633E3cEf91afE583",
  WHITEPAPER_URL:
    "https://drive.google.com/file/d/19aRA1INjIu3PKW9Q4vvHpLYDCEDXmvza/view?usp=drivesdk",
  SCHEDULE: "https://calendly.com/phil-detrash/30min",
};

type NavPageProps = {
  name: "recy" | "roadmap" | "team";
  path: string;
};

export const NAV_PAGES: NavPageProps[] = [
  {
    name: "recy",
    path: "/recy",
  },
  {
    name: "roadmap",
    path: "/roadmap",
  },
  {
    name: "team",
    path: "/team",
  },
];
