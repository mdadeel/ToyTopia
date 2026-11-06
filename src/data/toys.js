import teddy from '../assets/toys/teddy.jpg';
import blocks from '../assets/toys/blocks.jpg';
import football from '../assets/toys/football.jpg';
import puzzle from '../assets/toys/puzzle.jpg';
import craft from '../assets/toys/craft.jpg';
import robot from '../assets/toys/robot.jpg';
import boardgame from '../assets/toys/boardgame.jpg';
import tablet from '../assets/toys/tablet.jpg';
import keyboard from '../assets/toys/keyboard.jpg';

export const CATEGORIES = [
  { slug: 'stuffed-animals', label: 'Stuffed Friends', tile: 'tile-blush', hint: 'Cuddly & soft' },
  { slug: 'building-blocks', label: 'Building Blocks', tile: 'tile-butter', hint: 'Stack & create' },
  { slug: 'outdoor', label: 'Outdoor & Sports', tile: 'tile-sky', hint: 'Move & play' },
  { slug: 'puzzles', label: 'Puzzles', tile: 'tile-sage', hint: 'Brain boosters' },
  { slug: 'arts-crafts', label: 'Arts & Crafts', tile: 'tile-lilac', hint: 'Make & paint' },
  { slug: 'stem', label: 'STEM & Learning', tile: 'tile-peach', hint: 'Smart play' },
];

const raw = [
  {
    id: 'toy-1', name: 'Snuggle Buddy Teddy', category: 'stuffed-animals', image: teddy,
    price: 30, rating: 4.8, reviews: 412, age: '2-6 yrs', material: 'Plush fabric',
    tag: 'Best Seller',
    description: 'A super-soft brown teddy that is perfect for naps, hugs and bedtime stories. Imported quality, safe for little ones.',
  },
  {
    id: 'toy-2', name: 'Rainbow Building Blocks', category: 'building-blocks', image: blocks,
    price: 25, rating: 4.9, reviews: 638, age: '3-8 yrs', material: 'Non-toxic plastic',
    tag: 'Top Rated',
    description: 'Bright, chunky blocks that help tiny brains grow. Safe for curious hands and big imaginations.',
  },
  {
    id: 'toy-3', name: 'Kick-Off Football', category: 'outdoor', image: football,
    price: 18, rating: 4.7, reviews: 289, age: '4-10 yrs', material: 'Soft PVC',
    tag: 'New',
    description: 'A lightweight, kid-friendly football for the backyard, the park or the living-room penalty shootout.',
  },
  {
    id: 'toy-4', name: 'Solar System Wooden Puzzle', category: 'puzzles', image: puzzle,
    price: 22, rating: 4.8, reviews: 351, age: '5-9 yrs', material: 'Wood',
    tag: null,
    description: 'A 100-piece puzzle that takes explorers from Earth to the edge of the galaxy. Planets and a rocket included!',
  },
  {
    id: 'toy-5', name: 'Little Artist Craft Kit', category: 'arts-crafts', image: craft,
    price: 28, rating: 4.9, reviews: 503, age: '4-10 yrs', material: 'Mixed',
    tag: 'Top Rated',
    description: 'Paints, pencils and a sketchbook in one box. Everything a budding Picasso needs to get started.',
  },
  {
    id: 'toy-6', name: 'Bolt the Robot', category: 'stem', image: robot,
    price: 42, rating: 4.6, reviews: 197, age: '5-12 yrs', material: 'ABS plastic',
    tag: 'New',
    description: 'A friendly robot with big buttons and lights that introduce coding through play. Batteries included.',
  },
  {
    id: 'toy-7', name: 'Family Game Night Box', category: 'puzzles', image: boardgame,
    price: 35, rating: 4.7, reviews: 264, age: '6+ yrs', material: 'Cardboard & wood',
    tag: null,
    description: 'A winding-path board game with wooden tokens and dice — the perfect excuse for a cosy family evening.',
  },
  {
    id: 'toy-8', name: 'Smart Start Tablet', category: 'stem', image: tablet,
    price: 38, rating: 4.5, reviews: 173, age: '3-7 yrs', material: 'Rubber & plastic',
    tag: null,
    description: 'A chunky learning tablet with alphabet buttons and friendly shapes. Screen-free, worry-free fun.',
  },
  {
    id: 'toy-9', name: 'Mini Maestro Keyboard', category: 'arts-crafts', image: keyboard,
    price: 26, rating: 4.6, reviews: 221, age: '3-8 yrs', material: 'Plastic',
    tag: null,
    description: 'A little keyboard with animal buttons and rainbow keys to spark a lifelong love of music.',
  },
  {
    id: 'toy-10', name: 'Magnetic Dream Tiles', category: 'building-blocks', image: blocks,
    price: 33, rating: 4.8, reviews: 318, age: '4-10 yrs', material: 'ABS plastic',
    tag: 'Best Seller',
    description: 'Translucent magnetic tiles that click together into stars, cubes and castles. STEM play at its best.',
  },
  {
    id: 'toy-11', name: 'Dino Trio Plush Set', category: 'stuffed-animals', image: teddy,
    price: 31, rating: 4.9, reviews: 446, age: '2-7 yrs', material: 'Plush fabric',
    tag: 'Top Rated',
    description: 'Three squishy dinosaurs in mint, mustard and pink. A prehistoric cuddle squad for any bedroom.',
  },
  {
    id: 'toy-12', name: 'Junior Scientist Kit', category: 'stem', image: robot,
    price: 29, rating: 4.7, reviews: 208, age: '6-12 yrs', material: 'Glass & plastic',
    tag: 'New',
    description: 'Beakers, test tubes and a mini volcano for safe at-home experiments. Lab coat not included (yet!).',
  },
];

export const toys = raw.map((t) => ({
  ...t,
  priceLabel: `$${t.price}`,
  categoryLabel: (CATEGORIES.find((c) => c.slug === t.category) || {}).label || t.category,
}));

export const formatPrice = (n) => `$${Number(n).toFixed(0)}`;
