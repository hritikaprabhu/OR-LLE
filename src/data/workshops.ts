import {
  heroPerfumeImg,
  nocturneOudImg,
  fleurSoieImg,
} from '../assets/images';

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  tier: 'Beginner' | 'Connoisseur' | 'Couples & Duos';
  duration: string;
  pricePerSeat: number; // in Rupees ₹
  groupSize: string;
  description: string;
  curriculum: string[];
  inclusions: string[];
  locations: {
    city: string;
    venue: string;
    nextDates: string[];
  }[];
  image: string;
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'art-of-blending',
    title: 'The Art of Olfactory Blending',
    subtitle: 'Hands-on Bespoke Formulation Atelier',
    tier: 'Beginner',
    duration: '2.5 Hours',
    pricePerSeat: 4500,
    groupSize: 'Intimate Group (Max 8 Guests)',
    description: 'An immersive introduction to haute perfumery. Step behind the perfumer’s organ, sample over 40 raw botanical absolutes, and compose your personal 50ml flacon to take home.',
    curriculum: [
      'The Science of Olfaction & Fragrance Note Pyramids',
      'Olfactory Evaluation of 40+ Rare Botanical Oils & Absolutes',
      'Balancing Top, Heart & Base Ratios with Precision Pipettes',
      'Formulating & Bottling Your Signature 50ml Crystal Flacon',
    ],
    inclusions: [
      'Bespoke 50ml crystal flacon with personalized 24k gold engraved label',
      'Personal formula registered in the ORÉLLE Atelier Archives for future refills',
      'Master Parfumeur formulation workbook & tasting wheel',
      'Artisanal Kashmiri saffron tea, French macarons & champagne',
    ],
    locations: [
      {
        city: 'Mumbai',
        venue: 'ORÉLLE Atelier, Colaba Heritage Precinct',
        nextDates: ['Saturday, 24 Oct (11:00 AM)', 'Sunday, 25 Oct (3:30 PM)', 'Saturday, 31 Oct (11:00 AM)'],
      },
      {
        city: 'New Delhi',
        venue: 'The Chanakya Luxury Arcade, Chanakyapuri',
        nextDates: ['Friday, 23 Oct (4:00 PM)', 'Saturday, 24 Oct (2:00 PM)', 'Saturday, 7 Nov (11:00 AM)'],
      },
      {
        city: 'Bengaluru',
        venue: 'Lavelle Road Botanical Studio',
        nextDates: ['Sunday, 1 Nov (11:00 AM)', 'Saturday, 14 Nov (3:00 PM)'],
      },
    ],
    image: fleurSoieImg,
  },
  {
    id: 'royal-oud-sandalwood',
    title: 'Ancient Botanicals: Royal Oud & Sandalwood',
    subtitle: 'Masterclass in Sacred Indian Distillations & Aged Resins',
    tier: 'Connoisseur',
    duration: '3.0 Hours',
    pricePerSeat: 6500,
    groupSize: 'Masterclass (Max 6 Guests)',
    description: 'A deep sensory exploration of India’s legendary botanical terroirs: authentic Mysore sandalwood, wild-foraged Assam oud, Kannauj damask rose, and Kashmiri saffron.',
    curriculum: [
      'History of Indian Deg-Bhapka hydro-distillation from Kannauj',
      'Aging processes of Cambodian vs Wild Assamese Agarwood (Oud)',
      'The sacred chemistry of pure Mysore Santalum album',
      'Compounding an opulent 50ml Extrait de Parfum (28% concentration)',
    ],
    inclusions: [
      '50ml Extrait de Parfum in heavyweight smoked obsidian glass flacon',
      '24k Gold custom engraved plaque with your choice of monogram',
      'Vial of rare aged Assam Oud dilution for personal archiving',
      'Rare single-estate Darjeeling first-flush tea tasting & curated tapas',
    ],
    locations: [
      {
        city: 'Mumbai',
        venue: 'ORÉLLE Atelier, Colaba Heritage Precinct',
        nextDates: ['Saturday, 31 Oct (3:30 PM)', 'Sunday, 8 Nov (11:00 AM)'],
      },
      {
        city: 'New Delhi',
        venue: 'The Chanakya Luxury Arcade, Chanakyapuri',
        nextDates: ['Sunday, 25 Oct (11:00 AM)', 'Sunday, 8 Nov (3:00 PM)'],
      },
      {
        city: 'Jaipur',
        venue: 'Narain Niwas Palace Botanical Pavilion',
        nextDates: ['Saturday, 21 Nov (4:00 PM)', 'Sunday, 22 Nov (11:00 AM)'],
      },
    ],
    image: nocturneOudImg,
  },
  {
    id: 'sensory-duet-couples',
    title: 'Sensory Duet: Companion Fragrance Atelier',
    subtitle: 'Private Creation Experience for Couples & Duos',
    tier: 'Couples & Duos',
    duration: '2.5 Hours',
    pricePerSeat: 8500, // For a pair (2 attendees)
    groupSize: 'Private Duo Station',
    description: 'Designed exclusively for couples, partners, or best friends. Formulate two bespoke fragrances engineered to harmonize together when you are in each other’s presence.',
    curriculum: [
      'The Olfactory Chemistry of Harmonious Scent Layering',
      'Selecting complementary masculine, feminine, or unisex base notes',
      'Crafting shared chord notes that bridge both creations',
      'Custom wax-sealing and bottle engraving for both flacons',
    ],
    inclusions: [
      'Two (2) custom 50ml flacons with paired complementary engravings',
      'Luxury velvet keepsake double-flacon casket',
      'Polaroid keepsake photo of your formulating session',
      'Vintage champagne, artisanal Belgian chocolate truffles & hors d’oeuvres',
    ],
    locations: [
      {
        city: 'Mumbai',
        venue: 'ORÉLLE Atelier, Colaba Heritage Precinct',
        nextDates: ['Friday, 23 Oct (6:00 PM)', 'Saturday, 31 Oct (6:30 PM)', 'Friday, 6 Nov (6:00 PM)'],
      },
      {
        city: 'New Delhi',
        venue: 'The Chanakya Luxury Arcade, Chanakyapuri',
        nextDates: ['Saturday, 24 Oct (6:00 PM)', 'Saturday, 7 Nov (6:00 PM)'],
      },
      {
        city: 'Bengaluru',
        venue: 'Lavelle Road Botanical Studio',
        nextDates: ['Saturday, 31 Oct (5:30 PM)', 'Sunday, 15 Nov (5:00 PM)'],
      },
    ],
    image: heroPerfumeImg,
  },
];
