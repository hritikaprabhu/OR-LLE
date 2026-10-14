import React, { useState } from 'react';
import { Eye, Plus, Sparkles, Filter } from 'lucide-react';
import { PERFUMES, Perfume } from '../data/perfumes';
import { useCart } from '../context/CartContext';

interface PerfumeCatalogProps {
  onSelectPerfume: (perfume: Perfume) => void;
  onNavigateToQuiz: () => void;
  onNavigateToLab: () => void;
}

export const PerfumeCatalog: React.FC<PerfumeCatalogProps> = ({
  onSelectPerfume,
  onNavigateToQuiz,
  onNavigateToLab,
}) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'woody', label: 'Woody & Amber' },
    { id: 'floral', label: 'Luminous Floral' },
    { id: 'citrus', label: 'Citrus Solar' },
    { id: 'gourmand', label: 'Dark Gourmand' },
    { id: 'fresh', label: 'Zen Fresh' },
  ];

  const filteredPerfumes =
    selectedCategory === 'all'
      ? PERFUMES
      : PERFUMES.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, perfume: Perfume) => {
    e.stopPropagation();
    addToCart({
      type: 'perfume',
      title: perfume.name,
      subtitle: `${perfume.subtitle} (50ml)`,
      price: perfume.price50ml,
      image: perfume.image,
      details: {
        size: '50ml',
        perfumeId: perfume.id,
      },
    });

    setQuickAddedId(perfume.id);
    setTimeout(() => setQuickAddedId(null), 1000);
  };

  return (
    <section id="collection" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            Haute Parfumerie Flacons
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            The Signature Collection
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Each flacon is formulated in small batches with cold-pressed natural essences, aged in dark French oak casks, and bottled in recyclable crystal glass with champagne gold caps.
          </p>
        </div>

        {/* Interactive Filter Control Tabs (Segmented functional buttons) */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1 bg-[#F4F0EA] border border-[#EAE4DC] gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[12px] tracking-[0.1em] uppercase font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE4DC]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredPerfumes.map((perfume) => (
            <div
              key={perfume.id}
              onClick={() => onSelectPerfume(perfume)}
              className="group cursor-pointer bg-white border border-[#EAE4DC] hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Product Visual Top (65% of card visual area) */}
              <div className="relative aspect-[4/3] bg-[#F4F0EA] overflow-hidden">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Bestseller indicator */}
                {perfume.bestseller && (
                  <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-[#FAF8F5] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1">
                    Signature Favorite
                  </div>
                )}

                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-[#1C1917]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPerfume(perfume);
                    }}
                    className="px-4 py-2 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Notes</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, perfume)}
                    className="px-4 py-2 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{quickAddedId === perfume.id ? 'Added!' : 'Quick Add'}</span>
                  </button>
                </div>
              </div>

              {/* Product Information & Clean Metadata */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata with bullet separators (No pills) */}
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C] tracking-wide uppercase">
                    <span>{perfume.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{perfume.intensity}</span>
                    <span aria-hidden="true">·</span>
                    <span>{perfume.longevity}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#1C1917] group-hover:text-[#9E8055] transition-colors font-normal">
                    {perfume.name}
                  </h3>

                  <p className="text-xs text-[#78716C] italic font-serif">
                    {perfume.subtitle}
                  </p>

                  <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
                    {perfume.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4F0EA] flex items-center justify-between">
                  <div className="text-xs text-[#78716C]">
                    Key Note: <span className="text-[#1C1917] font-medium">{perfume.accentNote}</span>
                  </div>
                  <div className="text-sm font-mono font-medium text-[#1C1917] tabular-nums">
                    from ₹{perfume.price50ml.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery Callout Strip */}
        <div className="mt-16 p-8 bg-[#F4F0EA] border border-[#EAE4DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl text-[#1C1917]">Can&apos;t choose your signature aura?</h4>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Take our 60-second interactive fragrance questionnaire or formulate your own custom flacon.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToQuiz}
              className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-medium transition-colors"
            >
              Take Scent Quiz
            </button>
            <button
              onClick={onNavigateToLab}
              className="px-5 py-2.5 bg-transparent border border-[#1C1917] text-[#1C1917] hover:bg-[#FAF8F5] text-xs tracking-wider uppercase font-medium transition-colors"
            >
              Formulate Custom Flacon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
