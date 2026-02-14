import {
  RoseRed,
  Sunflower,
  LilyWhite,
  Carnation,
  TulipPink,
  Daffodil,
  Poppy,
  Violet
} from '../components/flower-assets/FlowerAssets.jsx';

export const flowers = [
  {
    id: 'rose',
    name: 'Rose',
    meaning: 'Love and Passion',
    birthMonth: 'June',
    color: '#E34234',
    component: RoseRed,
    image: '/flowers/rose.png'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    meaning: 'Adoration and Loyalty',
    birthMonth: 'August',
    color: '#FFDA03',
    component: Sunflower,
    image: '/flowers/sunflower.png'
  },
  {
    id: 'lily',
    name: 'Lily',
    meaning: 'Purity and Rebirth',
    birthMonth: 'May',
    color: '#Ffffff',
    component: LilyWhite,
    image: '/flowers/lily.png'
  },
  {
    id: 'daisy',
    name: 'Daisy',
    meaning: 'Innocence and Hope',
    birthMonth: 'April',
    color: '#FFFFFF',
    component: Carnation,
    image: '/flowers/daisy.png'
  },
  {
    id: 'tulip',
    name: 'Tulip',
    meaning: 'Deep Love',
    birthMonth: 'Total',
    color: '#FF69B4',
    component: TulipPink,
    image: '/flowers/tulip.png'
  },
  {
    id: 'zinnia',
    name: 'Zinnia',
    meaning: 'Lasting Affection',
    birthMonth: 'null',
    color: '#E6E6FA',
    component: Daffodil, // Fallback
    image: '/flowers/zinnia.png'
  },
  {
    id: 'anemone',
    name: 'Anemone',
    meaning: 'Anticipation',
    birthMonth: 'August',
    color: '#FF0000',
    component: Poppy, // Fallback
    image: '/flowers/anemone.png'
  },
  {
    id: 'orchid',
    name: 'Orchid',
    meaning: 'Beauty and Strength',
    birthMonth: 'null',
    color: '#DA70D6',
    component: Violet,
    image: '/flowers/orchid.png'
  },
  {
    id: 'peony',
    name: 'Peony',
    meaning: 'Prosperity',
    birthMonth: 'November',
    color: '#FFC0CB',
    component: RoseRed, // Fallback
    image: '/flowers/peony.png'
  },
  {
    id: 'ranunculus',
    name: 'Ranunculus',
    meaning: 'Charm',
    birthMonth: 'January',
    color: '#87CEEB',
    component: Sunflower, // Fallback
    image: '/flowers/ranunculus.png'
  },
  {
    id: 'carnation',
    name: 'Carnation',
    meaning: 'Fascination',
    birthMonth: 'January',
    color: '#FFB6C1',
    component: Carnation, // Fallback
    image: '/flowers/carnation.png'
  },
  {
    id: 'dahlia',
    name: 'Dahlia',
    meaning: 'Inner Strength',
    birthMonth: 'July',
    color: '#FFFF00',
    component: Daffodil, // Fallback
    image: '/flowers/dahlia.png'
  }
];
