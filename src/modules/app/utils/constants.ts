import {
  Bag,
  Article,
  BeerBottle,
  Hamburger,
  CoinVertical,
} from 'phosphor-react';

export const USER_ROLE_TYPES = ['Hodler', 'Recycler', 'Waste Generator'];

export const USER_WASTE_TYPES = [
  {
    key: 'Plastic',
    Icon: Bag,
  },
  {
    key: 'Paper',
    Icon: Article,
  },
  {
    key: 'Metal',
    Icon: CoinVertical,
  },
  {
    key: 'Glass',
    Icon: BeerBottle,
  },
  {
    key: 'Organic',
    Icon: Hamburger,
  },
];

export const FORM_STEPS = {
  welcome: 1,
  profile: 2,
  wasteDetails: 3,
  done: 4,
};

export const FORM_WASTE_TYPES = {
  Plastic: 1,
  Paper: 2,
  Metal: 3,
  Glass: 4,
  Organic: 5,
};
