import {
  Article,
  Bag,
  BeerBottle,
  CoinVertical,
  Hamburger,
} from 'phosphor-react';
import { ProfileType } from '../graphql/generated/graphql';

export const USER_ROLE_TYPES = [
  {
    key: ProfileType.Hodler,
    value: 'Hodler',
  },
  {
    key: ProfileType.Recycler,
    value: 'Recycler',
  },
  {
    key: ProfileType.WasteGenerator,
    value: 'Waste Generator',
    isDisabled: true,
  },
];

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
