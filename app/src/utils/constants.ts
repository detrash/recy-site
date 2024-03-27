import {
  Article,
  Bag,
  BeerBottle,
  CoinVertical,
  Hamburger,
  TShirt,
  Trash,
} from "phosphor-react";
import { ProfileType, ResidueType } from "../graphql/generated/graphql";

export enum Role {
  Admin = "admin",
}

export const PERMISSION_SCOPES = {
  [Role.Admin]: ["read:users"],
};

export const USER_ROLE_TYPES = [
  {
    key: ProfileType.Hodler,
    value: "Hodler",
  },
  {
    key: ProfileType.Recycler,
    value: "Recycler",
  },
  {
    key: ProfileType.WasteGenerator,
    value: "Waste Generator",
  },
];

export const USER_WASTE_TYPES = [
  {
    Icon: Bag,
    key: ResidueType.Plastic,
    value: "Plastic",
  },
  {
    Icon: Article,
    key: ResidueType.Paper,
    value: "Paper",
  },
  {
    Icon: CoinVertical,
    key: ResidueType.Metal,
    value: "Metal",
  },
  {
    Icon: BeerBottle,
    key: ResidueType.Glass,
    value: "Glass",
  },
  {
    Icon: Hamburger,
    key: ResidueType.Organic,
    value: "Organic",
  },
  {
    Icon: TShirt,
    key: ResidueType.Textile,
    value: "Textile",
  },
  {
    Icon: Trash,
    key: ResidueType.Landfill_Waste,
    value: "Landfill_Waste",
  },
];

export const FORM_STEPS = {
  welcome: 1,
  profile: 2,
  wasteDefinitions: 3,
  wasteDetails: 4,
  done: 5,
};

export const FORM_WASTE_TYPES = {
  Plastic: 1,
  Paper: 2,
  Metal: 3,
  Glass: 4,
  Organic: 5,
  Textile: 6,
  Landfill_Waste: 7,
};
