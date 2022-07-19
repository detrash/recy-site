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
