import { FlowerType, RibbonStyle } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

export const DEFAULT_FLOWER_COLORS = {
  [FlowerType.ROSE]: '#e11d48', // Red-600
  [FlowerType.TULIP]: '#db2777', // Pink-600
  [FlowerType.DAISY]: '#ffffff', // White
  [FlowerType.SUNFLOWER]: '#f59e0b', // Amber-500
  [FlowerType.LAVENDER]: '#7c3aed', // Violet-600
  [FlowerType.LILY]: '#fce7f3', // Pink-100 (often white/pink)
  [FlowerType.ORCHID]: '#d946ef', // Fuchsia-500
  [FlowerType.CARNATION]: '#f43f5e', // Rose-500
  [FlowerType.HYDRANGEA]: '#60a5fa', // Blue-400
  [FlowerType.PEONY]: '#f9a8d4', // Pink-300
  [FlowerType.POPPY]: '#ef4444', // Red-500
  [FlowerType.ANEMONE]: '#6366f1', // Indigo-500
  [FlowerType.CHERRY_BLOSSOM]: '#fbcfe8', // Pink-200
  [FlowerType.RANUNCULUS]: '#fcd34d', // Amber-300
  [FlowerType.DAHLIA]: '#9f1239', // Rose-800
  [FlowerType.IRIS]: '#4f46e5', // Indigo-600
  [FlowerType.GERBERA]: '#fb923c', // Orange-400
  [FlowerType.BABYS_BREATH]: '#f9fafb', // Gray-50
  [FlowerType.MARIGOLD]: '#ea580c', // Orange-600
  [FlowerType.HIBISCUS]: '#dc2626', // Red-600
  [FlowerType.JASMINE]: '#fefce8', // Yellow-50 (Whiteish)
};

export const FLOWER_LABELS = {
  [FlowerType.ROSE]: 'Rose',
  [FlowerType.TULIP]: 'Tulip',
  [FlowerType.DAISY]: 'Daisy',
  [FlowerType.SUNFLOWER]: 'Sunflower',
  [FlowerType.LAVENDER]: 'Lavender',
  [FlowerType.LILY]: 'Lily',
  [FlowerType.ORCHID]: 'Orchid',
  [FlowerType.CARNATION]: 'Carnation',
  [FlowerType.HYDRANGEA]: 'Hydrangea',
  [FlowerType.PEONY]: 'Peony',
  [FlowerType.POPPY]: 'Poppy',
  [FlowerType.ANEMONE]: 'Anemone',
  [FlowerType.CHERRY_BLOSSOM]: 'Cherry Blossom',
  [FlowerType.RANUNCULUS]: 'Ranunculus',
  [FlowerType.DAHLIA]: 'Dahlia',
  [FlowerType.IRIS]: 'Iris',
  [FlowerType.GERBERA]: 'Gerbera',
  [FlowerType.BABYS_BREATH]: "Baby's Breath",
  [FlowerType.MARIGOLD]: 'Marigold',
  [FlowerType.HIBISCUS]: 'Hibiscus',
  [FlowerType.JASMINE]: 'Jasmine',
};

export const RIBBON_LABELS = {
  [RibbonStyle.SIMPLE]: 'Simple Knot',
  [RibbonStyle.BOW]: 'Classic Bow',
  [RibbonStyle.LONG]: 'Long Streamers',
  [RibbonStyle.DOUBLE_BOW]: 'Double Bow',
  [RibbonStyle.CURLY]: 'Curly Ribbon',
  [RibbonStyle.TWINE]: 'Rustic Twine',
};