export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  category: 'woody' | 'floral' | 'citrus' | 'gourmand' | 'fresh';
  categoryLabel: string;
  price50ml: number;
  price100ml: number;
  intensity: 'Subtle' | 'Balanced' | 'Intense' | 'Extrait';
  concentration: string;
  longevity: string;
  mood: string;
  description: string;
  story: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  occasions: string[];
  image: string;
  bestseller?: boolean;
  accentNote: string;
}

export const PERFUMES: Perfume[] = [
  {
    id: 'aura-nocturna',
    name: 'Aura Nocturna',
    subtitle: 'Smoky Oud & Damask Rose',
    category: 'woody',
    categoryLabel: 'Woody Oriental',
    price50ml: 6500,
    price100ml: 9500,
    intensity: 'Intense',
    concentration: 'Extrait de Parfum (25%)',
    longevity: '12+ Hours',
    mood: 'Enigmatic, Magnetic, Velvet',
    description: 'An intoxicating nocturnal blend where smoked Cambodian oud meets velvety Damask rose and golden honey.',
    story: 'Crafted for midnight conversations and velvet-draped evenings. It creates a lingering sillage of shadowed warmth and aristocratic decadence.',
    topNotes: ['Smoked Cardamom', 'Pink Peppercorn', 'Bergamot Zest'],
    heartNotes: ['Damask Rose', 'Smoked Cedarwood', 'Wild Dark Honey'],
    baseNotes: ['Cambodian Oud', 'Bourbon Vanilla', 'Ambergris'],
    occasions: ['Evening Soirées', 'Date Nights', 'Autumn & Winter Gatherings'],
    image: '/src/assets/images/perfume_nocturne_oud_1791988840340.jpg',
    bestseller: true,
    accentNote: 'Smoked Cambodian Oud',
  },
  {
    id: 'fleur-de-soie',
    name: 'Fleur de Soie',
    subtitle: 'Jasmine Grandiflorum & Cashmere',
    category: 'floral',
    categoryLabel: 'Luminous Floral',
    price50ml: 5800,
    price100ml: 8500,
    intensity: 'Balanced',
    concentration: 'Eau de Parfum (18%)',
    longevity: '8–10 Hours',
    mood: 'Ethereal, Luminous, Graceful',
    description: 'A whisper of early dawn petals resting against crisp ivory silk and powdery Florentine iris.',
    story: 'Inspired by morning light streaming through sheer linen curtains in Grasse, capturing the fragile elegance of hand-picked night-blooming jasmine.',
    topNotes: ['Dewy White Pear', 'Italian Neroli', 'Mandarin Leaf'],
    heartNotes: ['Jasmine Grandiflorum', 'Grasse Peony', 'Florentine Iris'],
    baseNotes: ['White Cashmere', 'Sheer Musk', 'Blonde Cedar'],
    occasions: ['Daytime Chic', 'Art Exhibitions', 'Spring Celebrations'],
    image: '/src/assets/images/perfume_fleur_soie_1791988840392.jpg',
    bestseller: true,
    accentNote: 'Grasse Jasmine Grandiflorum',
  },
  {
    id: 'soleil-dore',
    name: 'Soleil Doré',
    subtitle: 'Calabrian Bergamot & Solar Amber',
    category: 'citrus',
    categoryLabel: 'Citrus Solar',
    price50ml: 5400,
    price100ml: 7900,
    intensity: 'Balanced',
    concentration: 'Eau de Parfum (18%)',
    longevity: '8 Hours',
    mood: 'Radiant, Euphoric, Golden',
    description: 'Golden solar warmth bottled with sparkling Mediterranean citrus, neroli blossom, and sun-warmed amber.',
    story: 'The sensation of bare skin kissed by the Riviera midday sun, blending invigorating citrus zest with a rich, glowing mineral drydown.',
    topNotes: ['Calabrian Bergamot', 'Bitter Orange', 'Candied Mandarin'],
    heartNotes: ['Neroli Blossom', 'Fig Leaf Accord', 'Sea Salt Spray'],
    baseNotes: ['Solar Amber', 'Golden Vetiver', 'Sun-Bleached Driftwood'],
    occasions: ['Summer Escapes', 'Weekend Brunch', 'Daily Uplift'],
    image: '/src/assets/images/perfume_soleil_dore_1791988842156.jpg',
    accentNote: 'Calabrian Bergamot',
  },
  {
    id: 'santal-cachemire',
    name: 'Santal & Cachemire',
    subtitle: 'Mysore Sandalwood & Orris',
    category: 'woody',
    categoryLabel: 'Creamy Woody',
    price50ml: 6200,
    price100ml: 8900,
    intensity: 'Balanced',
    concentration: 'Eau de Parfum (20%)',
    longevity: '10 Hours',
    mood: 'Intimate, Tactile, Understated',
    description: 'A second-skin aura of creamy sandalwood wrapped in tactile cashmeran and roasted cardamom.',
    story: 'Understated quiet luxury. Santal & Cachemire lingers like a beloved cashmere knit on a crisp autumn afternoon, blending warmth with clean modern lines.',
    topNotes: ['Green Cardamom', 'Nutmeg Essence', 'Carrot Seed'],
    heartNotes: ['Creamy Orris Butter', 'Milk Fig', 'Violet Leaf'],
    baseNotes: ['Mysore Sandalwood', 'Cashmeran', 'White Amber'],
    occasions: ['Signature Daily Wear', 'Gallery Openings', 'Chic Layering'],
    image: '/src/assets/images/hero_orel_perfume_1791988839425.jpg',
    bestseller: true,
    accentNote: 'Mysore Sandalwood',
  },
  {
    id: 'vanille-celeste',
    name: 'Vanille Céleste',
    subtitle: 'Roasted Bourbon Vanilla & Espresso',
    category: 'gourmand',
    categoryLabel: 'Dark Gourmand',
    price50ml: 5900,
    price100ml: 8600,
    intensity: 'Intense',
    concentration: 'Eau de Parfum (22%)',
    longevity: '11 Hours',
    mood: 'Decadent, Sensual, Irresistible',
    description: 'Artisanal Madagascar bourbon vanilla deepened with dark roasted espresso beans and salted caramel.',
    story: 'Far from cloying candy, this is vanilla grown up: smoky, intoxicating, and balanced by bitter espresso and warm toasted tonka bean.',
    topNotes: ['Almond Liqueur', 'Dark Espresso Bean', 'Crushed Clove'],
    heartNotes: ['Madagascar Vanilla Caviar', 'Tonka Bean', 'Heliotrope'],
    baseNotes: ['Smoked Birch', 'Salted Caramel', 'Benzoin Resin'],
    occasions: ['Intimate Dinners', 'Winter Nights', 'Celebratory Evenings'],
    image: '/src/assets/images/perfume_nocturne_oud_1791988840340.jpg',
    accentNote: 'Madagascar Bourbon Vanilla',
  },
  {
    id: 'matcha-botanique',
    name: 'Matcha Botanique',
    subtitle: 'Ceremonial Matcha & Hinoki Wood',
    category: 'fresh',
    categoryLabel: 'Zen Fresh',
    price50ml: 5200,
    price100ml: 7500,
    intensity: 'Subtle',
    concentration: 'Eau de Parfum (16%)',
    longevity: '7–8 Hours',
    mood: 'Mindful, Crisp, Harmonious',
    description: 'A serene blend of freshly whisked ceremonial matcha, juicy nashi pear, and misty Japanese Hinoki cedar.',
    story: 'A meditative pause in a modern world. The crisp green tea leaves harmonize with sheer white flowers and soft misty woods for an effortlessly clean aura.',
    topNotes: ['Ceremonial Matcha', 'Nashi Pear', 'Crushed Mint'],
    heartNotes: ['White Tea Blossom', 'Bamboo Dew', 'Magnolia'],
    baseNotes: ['Hinoki Wood', 'Haitian Vetiver', 'Clean Linen Musk'],
    occasions: ['Creative Studio Sessions', 'Everyday Elegance', 'Mindful Mornings'],
    image: '/src/assets/images/perfume_soleil_dore_1791988842156.jpg',
    accentNote: 'Ceremonial Uji Matcha',
  },
];

export interface FragranceNote {
  id: string;
  name: string;
  tier: 'top' | 'heart' | 'base';
  category: string;
  character: string;
  origin: string;
}

export const FRAGRANCE_NOTES: FragranceNote[] = [
  // Top Notes
  { id: 'bergamot', name: 'Calabrian Bergamot', tier: 'top', category: 'Citrus', character: 'Sparkling, crisp, sunlit citrus aroma', origin: 'Reggio Calabria, Italy' },
  { id: 'cardamom', name: 'Smoked Cardamom', tier: 'top', category: 'Spicy', character: 'Warm, aromatic spice with cool undertones', origin: 'Guatemala' },
  { id: 'pink-pepper', name: 'Pink Peppercorn', tier: 'top', category: 'Spicy', character: 'Faceted, rosy, zesty vibrant sparkle', origin: 'Madagascar' },
  { id: 'nashi-pear', name: 'Dewy Nashi Pear', tier: 'top', category: 'Fruity', character: 'Juicy, crisp, watery floral sweetness', origin: 'Japan' },
  { id: 'neroli', name: 'Neroli Blossom', tier: 'top', category: 'Floral Citrus', character: 'Bright, sweet honeyed orange blossoms', origin: 'Tunisia' },
  { id: 'mandarin', name: 'Blood Mandarin', tier: 'top', category: 'Citrus', character: 'Succulent, sun-drenched sweet citrus', origin: 'Sicily, Italy' },

  // Heart Notes
  { id: 'damask-rose', name: 'Damask Rose Absolute', tier: 'heart', category: 'Floral', character: 'Velvety, opulent, honeyed crimson petals', origin: 'Isparta, Turkey' },
  { id: 'jasmine', name: 'Jasmine Grandiflorum', tier: 'heart', category: 'Floral', character: 'Luminous, narcotic, warm night blooms', origin: 'Grasse, France' },
  { id: 'orris', name: 'Florentine Orris Butter', tier: 'heart', category: 'Powdery Floral', character: 'Silky, creamy, violet-tinged luxury root', origin: 'Florence, Italy' },
  { id: 'matcha', name: 'Ceremonial Matcha Leaf', tier: 'heart', category: 'Herbal Green', character: 'Rich, umami-rich tranquil green tea note', origin: 'Kyoto, Japan' },
  { id: 'peony', name: 'White Dew Peony', tier: 'heart', category: 'Floral', character: 'Airy, delicate, soft petal whisper', origin: 'France' },
  { id: 'lavender', name: 'Wild French Lavender', tier: 'heart', category: 'Aromatic', character: 'Clean, herbaceous, calming twilight aura', origin: 'Provence, France' },

  // Base Notes
  { id: 'sandalwood', name: 'Royal Mysore Sandalwood', tier: 'base', category: 'Woody', character: 'Buttery, sacred, enveloping creamy warmth', origin: 'Karnataka, India' },
  { id: 'bourbon-vanilla', name: 'Madagascar Bourbon Vanilla', tier: 'base', category: 'Gourmand', character: 'Rich, boozy, balsamic sweet bean extract', origin: 'Madagascar' },
  { id: 'oud', name: 'Cambodian Smoked Oud', tier: 'base', category: 'Woody Smoky', character: 'Deep, resinous, dark balsamic luxury wood', origin: 'Cambodia' },
  { id: 'ambergris', name: 'Solar Mineral Amber', tier: 'base', category: 'Amber', character: 'Golden, skin-warmed salty mineral glow', origin: 'Sustainable Accord' },
  { id: 'white-musk', name: 'Clean Cashmere Musk', tier: 'base', category: 'Musk', character: 'Tactile, skin-scent softness like fine silk', origin: 'Clean Botanical Accord' },
  { id: 'tonka', name: 'Roasted Tonka Bean', tier: 'base', category: 'Gourmand', character: 'Toasted almond, coumarin, warm caramel tobacco', origin: 'Venezuela' },
];

export interface HamperBoxOption {
  id: string;
  name: string;
  description: string;
  material: string;
  color: string;
  badge?: string;
  basePrice: number;
}

export const HAMPER_BOXES: HamperBoxOption[] = [
  {
    id: 'heritage-ivory',
    name: 'The Heritage Ivory & Gold Box',
    description: 'Thick rigid structure in textured alabaster card stock with debossed champagne gold foil and cream velvet nest.',
    material: 'Textured Ivory Rigid Cardboard & Gold Foil',
    color: 'Ivory & Champagne Gold',
    badge: 'Signature',
    basePrice: 1500,
  },
  {
    id: 'midnight-chest',
    name: 'The Nocturne Midnight Velvet Chest',
    description: 'A deep onyx velvet covered keepsake box with brushed brass hardware and silk interior ribbon pull.',
    material: 'Plush Onyx Velvet & Brushed Brass',
    color: 'Onyx Black & Brushed Brass',
    basePrice: 1950,
  },
  {
    id: 'linen-atelier',
    name: 'The Raw Linen Minimalist Suite',
    description: 'Understated French unbleached linen fabric box with hand-stitched edging and custom wooden latch.',
    material: 'Natural French Linen & Blond Beech Wood',
    color: 'Soft Taupe Linen & Natural Wood',
    basePrice: 1250,
  },
];

export interface HamperComplement {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  description: string;
}

export const HAMPER_COMPLEMENTS: HamperComplement[] = [
  {
    id: 'candle-santale',
    name: 'Santal & Amber Botanical Candle (180g)',
    subtitle: 'Hand-poured coconut wax with crackling wood wick',
    price: 2100,
    category: 'Home Fragrance',
    description: 'Poured in frosted amber glass with 45-hour clean burn time.',
  },
  {
    id: 'discovery-trio',
    name: 'The Discovery Trio (3 x 5ml)',
    subtitle: 'Miniature spray vials of our top signature scents',
    price: 1800,
    category: 'Travel Discovery',
    description: 'Curated 5ml glass atomizers in a gold-embossed travel sleeve.',
  },
  {
    id: 'brass-atomizer',
    name: 'Brushed Gold Refillable Pocket Atomizer',
    subtitle: 'Aircraft-grade machined brass with leakproof valve',
    price: 1400,
    category: 'Accessories',
    description: 'Fits 8ml of fragrance for pocket or evening clutch portability.',
  },
  {
    id: 'silk-scarf',
    name: '100% Mulberry Silk Scented Ribbon Scarf',
    subtitle: 'Designed to be scented and worn or tied to bag handle',
    price: 1950,
    category: 'Lifestyle',
    description: 'Hand-rolled edges in Champagne Ivory with subtle geometric filigree.',
  },
  {
    id: 'travertine-coaster',
    name: 'Hand-Carved Travertine Perfume Tray',
    subtitle: 'Raw Italian stone plinth for vanity display',
    price: 1600,
    category: 'Home Decor',
    description: 'Solid natural stone, polished top surface with felt base protection.',
  },
];

