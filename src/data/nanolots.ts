import { Microlot } from './microlots';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const img = (file: string) => new URL(`../assets/images/${file}`, import.meta.url).href;

// We reuse the Microlot type for Nanolots to keep MicrolotProduct compatible.
export const nanolots: Microlot[] = [
  {
    id: 101,
    name: 'Typica Anaerobic Washed',
    slug: slugify('Typica Anaerobic Washed'),
    meta: 'Export Coffee',
    image: img('nano2.png'),
    notes: ['Cacao Nibs','Citrus Fruit','Creme','Lemon & Lime','Molasses Syrup','Sweet & Sugary'],
    color: 'forest-800',
    specUrl: `/nanolots/${slugify('Typica Anaerobic Washed')}`,
  },
  {
    id: 102,
    name: 'Typica Washed & Cherry-Fermented',
    slug: slugify('Typica Washed & Cherry-Fermented'),
    meta: 'Export Coffee',
    image: img('nano3.png'),
    notes: ['Cacao Nibs','Citrus Fruit','Honey','Milk Chocolate','Sweet','Sweet & Sugary','Cherry'],
    color: 'cacao-800',
    specUrl: `/nanolots/${slugify('Typica Washed & Cherry-Fermented')}`,
  },
  {
    id: 103,
    name: 'Typica Washed',
    slug: slugify('Typica Washed'),
    meta: 'Export Coffee',
    image: img('nano4.png'),
    notes: ['Cacao Nibs','Citrus Fruit','Honey','Milk Chocolate','Sweet','Sweet & Sugary'],
    color: 'brand-accent3',
    specUrl: `/nanolots/${slugify('Typica Washed')}`,
  },
  {
    id: 104,
    name: 'Ethiopian Anaerobic Washed',
    slug: slugify('Ethiopian Anaerobic Washed'),
    meta: 'Export Coffee',
    image: img('nano5.png'),
    notes: ['Cacao Nibs','Citrus Fruit','Fruity','Lemon & Lime','Mandarin Orange','Tangerine'],
    color: 'forest-800',
    specUrl: `/nanolots/${slugify('Ethiopian Anaerobic Washed')}`,
  },
  {
    id: 105,
    name: 'Pacamara Anaerobic Washed',
    slug: slugify('Pacamara Anaerobic Washed'),
    meta: 'Export Coffee',
    image: img('nano1.png'),
    notes: ['Fruity','Grapefruit','Sweet','Tomato'],
    color: 'cacao-800',
    specUrl: `/nanolots/${slugify('Pacamara Anaerobic Washed')}`,
  },
];
