import React, { useState } from 'react';
import { Compass, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { PERFUMES, Perfume } from '../data/perfumes';
import { useCart } from '../context/CartContext';

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    categoryAffinity: 'woody' | 'floral' | 'citrus' | 'gourmand' | 'fresh';
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'How would you describe the energy or aura you wish to radiate?',
    subtitle: 'Select the presence that aligns closest with your mood and personal identity.',
    options: [
      {
        label: 'Enigmatic & Magnetic',
        description: 'Drawn to mystery, deep conversations, shadowed warmth, and unforgettable nocturnal presence.',
        categoryAffinity: 'woody',
      },
      {
        label: 'Luminous & Ethereal',
        description: 'Quiet luxury, delicate silk, morning light, and effortless, poised sophistication.',
        categoryAffinity: 'floral',
      },
      {
        label: 'Radiant & Sunlit',
        description: 'Vibrant, uplifting, Mediterranean ease, golden hour optimism, and spontaneous energy.',
        categoryAffinity: 'citrus',
      },
      {
        label: 'Decadent & Sensual',
        description: 'Warm indulgences, rich sweetness, cozy firesides, and intoxicating comfort.',
        categoryAffinity: 'gourmand',
      },
      {
        label: 'Mindful & Harmonious',
        description: 'Botanical minimalism, tranquil tea ceremonies, clean architectural lines, and grounded peace.',
        categoryAffinity: 'fresh',
      },
    ],
  },
  {
    id: 2,
    title: 'Which sensory atmosphere evokes the deepest joy for you?',
    subtitle: 'Fragrance is deeply tied to emotional memories and tactile sensations.',
    options: [
      {
        label: 'Old World Amber & Dark Woods',
        description: 'Antique library bindings, velvety evening drapery, beeswax candles, and resinous smoke.',
        categoryAffinity: 'woody',
      },
      {
        label: 'Fresh Dew on White Petals',
        description: 'A crisp spring morning in Grasse, delicate sheer linen, and night-blooming white jasmine.',
        categoryAffinity: 'floral',
      },
      {
        label: 'Mediterranean Coast & Citrus Groves',
        description: 'Crushed bergamot peel, warm terracotta tiles, and salty breeze over the azure sea.',
        categoryAffinity: 'citrus',
      },
      {
        label: 'Artisanal Patisserie & Espresso',
        description: 'Madagascar bourbon vanilla beans, roasted tonka, dark roast coffee, and warm caramel.',
        categoryAffinity: 'gourmand',
      },
      {
        label: 'Misty Bamboo Groves & Japanese Cedar',
        description: 'Freshly whisked ceremonial matcha, rainy forest air, and pale polished Hinoki wood.',
        categoryAffinity: 'fresh',
      },
    ],
  },
  {
    id: 3,
    title: 'What is your preferred fragrance sillage and intensity?',
    subtitle: 'How prominently do you want your fragrance trail to be experienced by others?',
    options: [
      {
        label: 'Intimate Skin Scent',
        description: 'Subtle and whisper-soft. Discovered only when someone steps into your immediate embrace.',
        categoryAffinity: 'fresh',
      },
      {
        label: 'Balanced Signature Presence',
        description: 'Noticeable yet refined. Leaves a tasteful, magnetic trail as you walk through a room.',
        categoryAffinity: 'floral',
      },
      {
        label: 'Bold & Lasting Sillage',
        description: 'High-concentration Extrait. An enduring signature that lasts from morning until midnight.',
        categoryAffinity: 'woody',
      },
      {
        label: 'Warm Enveloping Cloud',
        description: 'Comforting and rich, cocooning you and those around you in delicious warmth.',
        categoryAffinity: 'gourmand',
      },
    ],
  },
  {
    id: 4,
    title: 'Where will your new fragrance accompany you most?',
    subtitle: 'Think of the moments where you want to feel most authentically yourself.',
    options: [
      {
        label: 'Golden Hour Soirées & Intimate Dinners',
        description: 'Dressing up, fine dining, curated music, and celebratory midnight cocktails.',
        categoryAffinity: 'woody',
      },
      {
        label: 'Daily Signature for Work & Creativity',
        description: 'Studio sessions, boutique meetings, everyday stylish ease without overwhelming.',
        categoryAffinity: 'floral',
      },
      {
        label: 'Sunlit Weekends & Travel Escapes',
        description: 'Coastal getaways, weekend brunch with friends, and outdoor farmer markets.',
        categoryAffinity: 'citrus',
      },
      {
        label: 'Cozy Evenings & Autumn Reads',
        description: 'Wrapped in oversized cashmere knits, rain tapping on glass, and slow evenings.',
        categoryAffinity: 'gourmand',
      },
    ],
  },
];

interface ScentQuizProps {
  onSelectPerfume: (perfume: Perfume) => void;
}

export const ScentQuiz: React.FC<ScentQuizProps> = ({ onSelectPerfume }) => {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [addedDirectly, setAddedDirectly] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentStep] = optionIndex;
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setIsCompleted(false);
    setAddedDirectly(false);
  };

  // Determine top matching perfume based on category counts
  const computeMatch = () => {
    const counts: Record<string, number> = {
      woody: 0,
      floral: 0,
      citrus: 0,
      gourmand: 0,
      fresh: 0,
    };

    answers.forEach((ansIdx, qIdx) => {
      const q = QUESTIONS[qIdx];
      if (q && q.options[ansIdx]) {
        const cat = q.options[ansIdx].categoryAffinity;
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    let topCat = 'woody';
    let maxScore = -1;
    Object.entries(counts).forEach(([cat, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topCat = cat;
      }
    });

    const primary = PERFUMES.find((p) => p.category === topCat) || PERFUMES[0];
    const secondaries = PERFUMES.filter((p) => p.id !== primary.id).slice(0, 2);

    // Persona mapping
    let personaTitle = 'The Enigmatic Visionary';
    let personaDesc = 'You crave depth, subtlety, and tactile presence. Your fragrance is not merely an accessory; it is an invisible signature that lingers long after you leave.';
    
    if (topCat === 'floral') {
      personaTitle = 'The Luminous Muse';
      personaDesc = 'You embody quiet elegance and refined minimalism. You appreciate fresh botanical nuances, sheer silks, and scents that bloom with radiant grace.';
    } else if (topCat === 'citrus') {
      personaTitle = 'The Solar Optimist';
      personaDesc = 'Your presence is vibrant and effortless. You love scents that capture sunlight on bare skin, crisp Mediterranean salt, and sparkling citrus energy.';
    } else if (topCat === 'gourmand') {
      personaTitle = 'The Velvet Decadent';
      personaDesc = 'You are warm, sensual, and magnetic. You are drawn to rich resins, roasted espresso, and bourbon vanilla that feels comforting yet utterly captivating.';
    } else if (topCat === 'fresh') {
      personaTitle = 'The Serene Botanist';
      personaDesc = 'You appreciate mindfulness, pristine clarity, and Japanese aesthetic discipline. Your ideal aura is clean, restorative, and grounded in misty woods.';
    }

    return { primary, secondaries, personaTitle, personaDesc, compatibility: 96 };
  };

  const matchData = isCompleted ? computeMatch() : null;

  const handleAddMatchToBag = () => {
    if (!matchData) return;
    addToCart({
      type: 'perfume',
      title: matchData.primary.name,
      subtitle: `${matchData.primary.subtitle} (50ml · Signature Match)`,
      price: matchData.primary.price50ml,
      image: matchData.primary.image,
      details: {
        size: '50ml',
        perfumeId: matchData.primary.id,
      },
    });
    setAddedDirectly(true);
    setTimeout(() => setAddedDirectly(false), 2000);
  };

  return (
    <section id="scent-finder" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span>Interactive Olfactory Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            Find Your Signature Scent
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light max-w-xl mx-auto">
            Answer 4 intuitive questions about your personality, sensory memories, and daily lifestyle. Our atelier engine computes your olfactory profile in real time.
          </p>
        </div>

        {!isCompleted ? (
          /* Questionnaire Card */
          <div className="bg-white border border-[#EAE4DC] shadow-sm p-6 sm:p-10 transition-all">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-mono">
                <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full h-1 bg-[#F4F0EA]">
                <div
                  className="h-full bg-[#1C1917] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Details */}
            <div className="space-y-2 mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
                {QUESTIONS[currentStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C]">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3.5 mb-8">
              {QUESTIONS[currentStep].options.map((option, idx) => {
                const isSelected = answers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                      isSelected
                        ? 'border-[#1C1917] bg-[#F4F0EA]'
                        : 'border-[#EAE4DC] hover:border-[#C5A880] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-semibold text-[#1C1917] group-hover:text-[#9E8055] transition-colors">
                        {option.label}
                      </div>
                      <div className="text-xs text-[#57534E] leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#1C1917] bg-[#1C1917] text-white' : 'border-[#D8CEBE]'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F4F0EA]">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-xs tracking-wider uppercase font-medium transition-colors ${
                  currentStep === 0 ? 'opacity-30 cursor-not-allowed text-[#A8A29E]' : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-[11px] text-[#A8A29E] tracking-wider uppercase">
                Choose an option to proceed
              </span>
            </div>
          </div>
        ) : (
          /* Results View */
          matchData && (
            <div className="bg-white border border-[#EAE4DC] shadow-md overflow-hidden animate-fadeIn">
              {/* Top Persona Header */}
              <div className="bg-[#1C1917] text-[#FAF8F5] p-6 sm:p-8 text-center space-y-2">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                  Your Signature Olfactory Profile
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal">
                  {matchData.personaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#D8CEBE] max-w-xl mx-auto leading-relaxed pt-1">
                  {matchData.personaDesc}
                </p>
                <div className="inline-block mt-2 px-3 py-1 bg-[#332F2C] border border-[#9E8055]/40 text-[#C5A880] text-xs font-mono">
                  {matchData.compatibility}% Compatibility Match
                </div>
              </div>

              {/* Matched Perfume Spotlight */}
              <div className="p-6 sm:p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 bg-[#F4F0EA] p-4 border border-[#EAE4DC]">
                    <img
                      src={matchData.primary.image}
                      alt={matchData.primary.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/3] object-cover shadow-sm"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
                      Your Primary Match
                    </div>
                    <h4 className="font-serif text-3xl text-[#1C1917]">
                      {matchData.primary.name}
                    </h4>
                    <p className="text-xs text-[#78716C] italic font-serif">
                      {matchData.primary.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {matchData.primary.story}
                    </p>

                    {/* Explanatory rationale */}
                    <div className="p-4 bg-[#FAF8F5] border-l-2 border-[#C5A880] text-xs text-[#44403C] space-y-1">
                      <div className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                        Why this is your scent:
                      </div>
                      <p>
                        Your preference for {matchData.primary.categoryLabel.toLowerCase()} accents and your desire for a {matchData.primary.intensity.toLowerCase()} presence perfectly harmonizes with its key note of <strong>{matchData.primary.accentNote}</strong>.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleAddMatchToBag}
                        className="px-6 py-3 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-medium transition-all shadow-sm cursor-pointer"
                      >
                        {addedDirectly ? 'Added to Bag ✓' : `Add Flacon to Bag — ₹${matchData.primary.price50ml.toLocaleString('en-IN')}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectPerfume(matchData.primary)}
                        className="px-5 py-3 bg-transparent border border-[#1C1917] text-[#1C1917] hover:bg-[#F4F0EA] text-xs tracking-wider uppercase font-medium transition-colors"
                      >
                        Explore Full Notes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary Recommendations */}
                <div className="pt-8 border-t border-[#EAE4DC] space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-xl text-[#1C1917]">
                      Harmonious Alternatives to Layer
                    </h5>
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchData.secondaries.map((alt) => (
                      <div
                        key={alt.id}
                        onClick={() => onSelectPerfume(alt)}
                        className="p-4 border border-[#EAE4DC] hover:border-[#C5A880] bg-[#FAF8F5] cursor-pointer flex items-center gap-4 group transition-all"
                      >
                        <img
                          src={alt.image}
                          alt={alt.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover border border-[#D8CEBE] shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="text-[10px] text-[#9E8055] uppercase tracking-wider">
                            {alt.categoryLabel}
                          </div>
                          <div className="font-serif text-lg text-[#1C1917] group-hover:text-[#9E8055] transition-colors">
                            {alt.name}
                          </div>
                          <div className="text-xs text-[#78716C] font-mono tabular-nums">
                            from ₹{alt.price50ml.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
