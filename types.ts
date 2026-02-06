export enum FlowerType {
  ROSE = 'ROSE',
  TULIP = 'TULIP',
  DAISY = 'DAISY',
  SUNFLOWER = 'SUNFLOWER',
  LAVENDER = 'LAVENDER',
  LILY = 'LILY',
  ORCHID = 'ORCHID',
  CARNATION = 'CARNATION',
  HYDRANGEA = 'HYDRANGEA',
  PEONY = 'PEONY',
  POPPY = 'POPPY',
  ANEMONE = 'ANEMONE',
  CHERRY_BLOSSOM = 'CHERRY_BLOSSOM',
  RANUNCULUS = 'RANUNCULUS',
  DAHLIA = 'DAHLIA',
  IRIS = 'IRIS',
  GERBERA = 'GERBERA',
  BABYS_BREATH = 'BABYS_BREATH',
  MARIGOLD = 'MARIGOLD',
  HIBISCUS = 'HIBISCUS',
  JASMINE = 'JASMINE'
}

export enum RibbonStyle {
  SIMPLE = 'SIMPLE',
  BOW = 'BOW',
  LONG = 'LONG',
  DOUBLE_BOW = 'DOUBLE_BOW',
  CURLY = 'CURLY',
  TWINE = 'TWINE'
}

export interface Flower {
  id: string;
  type: FlowerType;
  color: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  stemColor: string;
}

export interface BouquetState {
  flowers: Flower[];
  ribbonColor: string;
  ribbonStyle: RibbonStyle;
  wrapperColor: string;
  hasWrapper: boolean;
  backgroundColor: string;
}

export interface GeneratedBouquetRecipe {
  flowers: {
    type: FlowerType;
    color: string;
    count: number;
  }[];
  ribbonColor: string;
  wrapperColor: string;
  themeDescription: string;
}