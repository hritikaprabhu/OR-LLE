export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  category: 'woody' | 'floral' | 'citrus' | 'gourmand' | 'fresh';
  categoryLabel: string;
  gender: 'female' | 'male' | 'unisex';
  genderLabel: string;
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
    gender: 'unisex',
    genderLabel: 'Unisex',
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
    gender: 'female',
    genderLabel: 'For Her',
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
    id: 'cuir-imperiale',
    name: 'Cuir Impérial',
    subtitle: 'Tuscan Leather, Birch Smoke & Black Pepper',
    category: 'woody',
    categoryLabel: 'Smoky Leather',
    gender: 'male',
    genderLabel: 'For Him',
    price50ml: 6800,
    price100ml: 9900,
    intensity: 'Intense',
    concentration: 'Extrait de Parfum (26%)',
    longevity: '14+ Hours',
    mood: 'Commanding, Aristocratic, Bold',
    description: 'A sovereign masculine signature of aged Tuscan saddle leather, smoldering birch tar, black peppercorn, and dark labdanum.',
    story: 'Evoking bespoke Savile Row tailoring and private wood-paneled libraries, Cuir Impérial radiates quiet authority and timeless masculine refinement.',
    topNotes: ['Black Pepper', 'Nutmeg', 'Bitter Thyme'],
    heartNotes: ['Tuscan Leather Accord', 'Smoked Birch Bark', 'Cade Wood'],
    baseNotes: ['Atlas Cedarwood', 'Labdanum Resin', 'Ambergris'],
    occasions: ['Boardroom & Executive Evenings', 'Black Tie Galas', 'Winter Soirées'],
    image: '/src/assets/images/perfume_nocturne_oud_1791988840340.jpg',
    bestseller: true,
    accentNote: 'Tuscan Saddle Leather',
  },
  {
    id: 'soleil-dore',
    name: 'Soleil Doré',
    subtitle: 'Calabrian Bergamot & Solar Amber',
    category: 'citrus',
    categoryLabel: 'Citrus Solar',
    gender: 'unisex',
    genderLabel: 'Unisex',
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
    id: 'rose-velours',
    name: 'Rose Velours',
    subtitle: 'Crimson Rose, Sweet Lychee & Pink Amber',
    category: 'floral',
    categoryLabel: 'Opulent Floral',
    gender: 'female',
    genderLabel: 'For Her',
    price50ml: 5900,
    price100ml: 8700,
    intensity: 'Balanced',
    concentration: 'Eau de Parfum (20%)',
    longevity: '10 Hours',
    mood: 'Romantic, Hypnotic, Sensual',
    description: 'A modern tribute to haute femininity: velvety crimson rose petals drizzled with chilled lychee nectar and soft pink cashmere amber.',
    story: 'Capturing the irresistible magnetism of blooming Parisian gardens at dusk. Rose Velours wraps the wearer in an intoxicating veil of modern romance.',
    topNotes: ['Chilled Lychee', 'Italian Bergamot', 'Pink Pepper'],
    heartNotes: ['Centifolia Rose de Mai', 'Peony Dew', 'Raspberry Blossom'],
    baseNotes: ['Pink Amber', 'Cashmeran', 'White Musk'],
    occasions: ['Romantic Rendezvous', 'Weddings', 'Chic Cocktail Evenings'],
    image: '/src/assets/images/perfume_fleur_soie_1791988840392.jpg',
    accentNote: 'Centifolia Rose de Mai',
  },
  {
    id: 'santal-cachemire',
    name: 'Santal & Cachemire',
    subtitle: 'Mysore Sandalwood & Orris',
    category: 'woody',
    categoryLabel: 'Creamy Woody',
    gender: 'male',
    genderLabel: 'For Him',
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
    gender: 'female',
    genderLabel: 'For Her',
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
    gender: 'unisex',
    genderLabel: 'Unisex',
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
  {
    id: 'kannauj-royale',
    name: 'Kannauj Royale',
    subtitle: 'Kannauj Mitti Attar, Damascena Rose & Golden Amber',
    category: 'floral',
    categoryLabel: 'Regal Floral Clay',
    gender: 'female',
    genderLabel: 'For Her',
    price50ml: 6400,
    price100ml: 9200,
    intensity: 'Intense',
    concentration: 'Extrait de Parfum (26%)',
    longevity: '12+ Hours',
    mood: 'Nostalgic, Sovereign, Majestic',
    description: 'The poetic essence of monsoon rain striking baked Indian earth (petrichor Mitti Attar), harmonized with hydro-distilled Kannauj rose and warm golden amber.',
    story: 'Crafted in reverence to Kannauj, the historic perfume capital of India. Using 400-year-old hydro-distillation methods, baked Gangetic clay is captured in liquid form and elevated with royal Damascena roses.',
    topNotes: ['Dewy Bergamot', 'Petrichor Earth Accord', 'Kashmiri Pink Pepper'],
    heartNotes: ['Kannauj Damascena Rose', 'Madurai Mogra', 'Luminous Neroli'],
    baseNotes: ['Mitti Clay Attar', 'Mysore Sandalwood', 'Golden Ambergris'],
    occasions: ['Grand Festive Evenings', 'Weddings & Soirées', 'Poetic Monsoon Days'],
    image: '/src/assets/images/perfume_fleur_soie_1791988840392.jpg',
    bestseller: true,
    accentNote: 'Kannauj Baked Mitti Attar & Rose',
  },
  {
    id: 'khus-cedre',
    name: 'Khus & Cèdre Impérial',
    subtitle: 'Aligarh Ruh Khus, Green Cardamom & Smoked Cedar',
    category: 'woody',
    categoryLabel: 'Aromatic Earthy Woody',
    gender: 'male',
    genderLabel: 'For Him',
    price50ml: 6200,
    price100ml: 8900,
    intensity: 'Balanced',
    concentration: 'Eau de Parfum (22%)',
    longevity: '11 Hours',
    mood: 'Grounded, Sophisticated, Regal',
    description: 'Emerald green wild-harvested Ruh Khus vetiver root distilled in copper degs, sparked by Idukki cardamom and aged Himalayan cedar.',
    story: 'An ancient cooling signature of Indian royalty, reinvented for the contemporary gentleman. Wild roots of vetiver harvested from the marshes of Uttar Pradesh are aged in copper stills to yield an earthy, smoky green elixir.',
    topNotes: ['Idukki Green Cardamom', 'Crushed Juniper Berries', 'Black Peppercorn'],
    heartNotes: ['Copper-Distilled Ruh Khus', 'Nutmeg Flower', 'Wild Clary Sage'],
    baseNotes: ['Himalayan Smoked Cedar', 'Earthy Patchouli', 'Clean Skin Musk'],
    occasions: ['Signature Daily Luxury', 'Summer Evenings', 'Gentleman’s Black Tie'],
    image: '/src/assets/images/perfume_nocturne_oud_1791988840340.jpg',
    bestseller: true,
    accentNote: 'Copper-Distilled Wild Ruh Khus',
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
  { id: 'cardamom', name: 'Idukki Green Cardamom', tier: 'top', category: 'Spicy', character: 'Warm, aromatic spice with cool minty undertones', origin: 'Idukki, Kerala, India' },
  { id: 'pink-pepper', name: 'Pink Peppercorn', tier: 'top', category: 'Spicy', character: 'Faceted, rosy, zesty vibrant sparkle', origin: 'Madagascar' },
  { id: 'nashi-pear', name: 'Dewy Nashi Pear', tier: 'top', category: 'Fruity', character: 'Juicy, crisp, watery floral sweetness', origin: 'Japan' },
  { id: 'neroli', name: 'Neroli Blossom', tier: 'top', category: 'Floral Citrus', character: 'Bright, sweet honeyed orange blossoms', origin: 'Tunisia' },
  { id: 'saffron', name: 'Kashmiri Saffron (Mogra)', tier: 'top', category: 'Precious Spice', character: 'Golden, leather-tinged bittersweet warmth', origin: 'Pampore, Kashmir, India' },

  // Heart Notes
  { id: 'damask-rose', name: 'Kannauj Damascena Rose', tier: 'heart', category: 'Floral', character: 'Velvety, deeply opulent, royal crimson petal nectar', origin: 'Kannauj, Uttar Pradesh, India' },
  { id: 'jasmine', name: 'Madurai Jasmine Sambac (Mogra)', tier: 'heart', category: 'Floral', character: 'Luminous, narcotic, warm night-blooming white petals', origin: 'Madurai, Tamil Nadu, India' },
  { id: 'orris', name: 'Florentine Orris Butter', tier: 'heart', category: 'Powdery Floral', character: 'Silky, creamy, violet-tinged luxury root', origin: 'Florence, Italy' },
  { id: 'matcha', name: 'Nilgiri Silver Tips & Green Tea', tier: 'heart', category: 'Herbal Green', character: 'Crisp, dewy mountain tea leaves with serene clarity', origin: 'Nilgiris, Tamil Nadu, India' },
  { id: 'peony', name: 'White Dew Peony', tier: 'heart', category: 'Floral', character: 'Airy, delicate, soft petal whisper', origin: 'France' },
  { id: 'lavender', name: 'Wild French Lavender', tier: 'heart', category: 'Aromatic', character: 'Clean, herbaceous, calming twilight aura', origin: 'Provence, France' },

  // Base Notes
  { id: 'sandalwood', name: 'Royal Mysore Sandalwood', tier: 'base', category: 'Woody', character: 'Sacred, buttery, enveloping creamy temple warmth', origin: 'Mysore, Karnataka, India' },
  { id: 'bourbon-vanilla', name: 'Madagascar Bourbon Vanilla', tier: 'base', category: 'Gourmand', character: 'Rich, boozy, balsamic sweet bean extract', origin: 'Madagascar' },
  { id: 'oud', name: 'Wild Assam Smoked Agarwood (Oud)', tier: 'base', category: 'Woody Smoky', character: 'Deep, resinous, dark balsamic aged wood', origin: 'Upper Assam, India' },
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

