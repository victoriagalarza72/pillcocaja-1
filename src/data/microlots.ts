export type Microlot = {
  id: number;
  name: string;
  slug: string;
  meta: string; // e.g. "758.79 – export coffee"
  notes: string[];
  image: string;
  specUrl: string; // link to product page
  color: string;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const img = (file: string) => new URL(`../assets/images/${file}`, import.meta.url).href;

export const microlots: Microlot[] = [
  {
    id: 1,
    name: 'Typica Natural',
    slug: slugify('Typica Natural'),
    meta: 'Export Coffee',
    image: img('micro1.png'),
    notes: ['Blueberry','Cacao Nibs','Caramel','Chocolate','Creme','Fruity','Mandarin Orange','Orange','Pear','Sweet'],
    color: 'cacao-800',
    specUrl: `/microlots/${slugify('Typica Natural')}`
  },
  {
    id: 2,
    name: 'Typica Washed',
    slug: slugify('Typica Washed'),
    meta: 'Export Coffee',
    image: img('micro2.png'),
    notes: ['Cacao Nibs','Citrus Fruit','Honey','Milk Chocolate','Sweet','Sweet & Sugary'],
    color: 'forest-800',
    specUrl: `/microlots/${slugify('Typica Washed')}`
  },
  {
    id: 3,
    name: 'Typica Honey',
    slug: slugify('Typica Honey'),
    meta: 'Export Coffee',
    image: img('micro3.png'),
    notes: ['Brown Sugar','Flan','Fruity','Honey','White Chocolate'],
    color: 'brand-accent3',
    specUrl: `/microlots/${slugify('Typica Honey')}`
  },
  {
    id: 4,
    name: 'Typica Anaerobic Natural',
    slug: slugify('Typica Anaerobic Natural'),
    meta: 'Export Coffee',
    image: img('micro4.png'),
    notes: ['Berry','Blackberry','Blueberry','Candy','Caramel','Citrus Fruit','Fruity','Jamaica','Lemon','Mandarin Orange','Sweet','Sweet & Sugary'],
    color: 'cacao-800',
    specUrl: `/microlots/${slugify('Typica Anaerobic Natural')}`
  },
  {
    id: 5,
    name: 'Ethiopia Red Honey',
    slug: slugify('Ethiopia Red Honey'),
    meta: 'Export Coffee',
    image: img('micro5.png'),
    notes: ['Apple','Berry','Chocolate','Fruity','Honey','Strawberry','Sweet Aromatics'],
    color: 'forest-800',
    specUrl: `/microlots/${slugify('Ethiopia Red Honey')}`
  },
  {
    id: 6,
    name: 'Ethiopia Natural',
    slug: slugify('Ethiopia Natural'),
    meta: 'Export Coffee',
    image: img('micro6.png'),
    notes: ['Blackberry','Blueberry','Caramel','Citrus Fruit','Fruity','Guava','Hazelnut','Milk Chocolate','Sweet','Sweet & Sugary'],
    color: 'brand-accent3',
    specUrl: `/microlots/${slugify('Ethiopia Natural')}`
  },
  {
    id: 7,
    name: 'Ethiopia Washed',
    slug: slugify('Ethiopia Washed'),
    meta: 'Export Coffee',
    image: img('micro7.png'),
    notes: ['Chocolate','Creme','Fruity','Honey','Lemon & Lime','Milk Chocolate'],
    color: 'cacao-800',
    specUrl: `/microlots/${slugify('Ethiopia Washed')}`
  },
  {
    id: 8,
    name: 'Pacamara Natural',
    slug: slugify('Pacamara Natural'),
    meta: 'Export Coffee',
    image: img('micro8.png'),
    notes: ['Apple','Caramel','Cherry','Fruity','Orange','Sweet Aromatics','Tomato','Vegetative'],
    color: 'forest-800',
    specUrl: `/microlots/${slugify('Pacamara Natural')}`
  },
  {
    id: 9,
    name: 'Pacamara Washed',
    slug: slugify('Pacamara Washed'),
    meta: 'Export Coffee',
    image: img('micro9.png'),
    notes: ['Dried Fruit','Fruity','Sundried Tomato','Sweet'],
    color: 'brand-accent3',
    specUrl: `/microlots/${slugify('Pacamara Washed')}`
  },
  {
    id: 10,
    name: 'Nestlé Anaerobic',
    slug: slugify('Nestlé Anaerobic'),
    meta: 'Export Coffee',
    image: img('micro1.png'),
    notes: ['Citrus','Floral'],
    color: 'forest-800',
    specUrl: `/microlots/${slugify('Nestlé Anaerobic')}`
  },
  {
    id: 11,
    name: 'Nestlé Natural',
    slug: slugify('Nestlé Natural'),
    meta: 'Export Coffee',
    image: img('micro1.png'),
    notes: ['Caramel','Orange'],
    color: 'cacao-800',
    specUrl: `/microlots/${slugify('Nestlé Natural')}`
  },
  {
    id: 12,
    name: 'Nestlé Washed',
    slug: slugify('Nestlé Washed'),
    meta: 'Export Coffee',
    image: img('micro1.png'),
    notes: ['Berry','Cacao Nib'],
    color: 'brand-accent3',
    specUrl: `/microlots/${slugify('Nestlé Washed')}`
  },
];

export const findMicrolot = (slug: string) => microlots.find(m => m.slug === slug);
