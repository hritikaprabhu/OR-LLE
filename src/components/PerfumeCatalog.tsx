import React, { useState, useMemo } from 'react';
import { Eye, Plus, Sparkles, Filter, Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'female' | 'male' | 'unisex'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const genderFilters = [
    { id: 'all', label: 'All Scent Profiles' },
    { id: 'female', label: 'For Her (Female)' },
    { id: 'male', label: 'For Him (Male)' },
    { id: 'unisex', label: 'Unisex (Genderless)' },
  ];

  const categories = [
    { id: 'all', label: 'All Families' },
    { id: 'woody', label: 'Woody & Amber' },
    { id: 'floral', label: 'Luminous Floral' },
    { id: 'citrus', label: 'Citrus Solar' },
    { id: 'gourmand', label: 'Dark Gourmand' },
    { id: 'fresh', label: 'Zen Fresh' },
  ];

  const filteredPerfumes = useMemo(() => {
    return PERFUMES.filter((perfume) => {
      // Gender filter
      if (selectedGender !== 'all' && perfume.gender !== selectedGender) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && perfume.category !== selectedCategory) {
        return false;
      }

      // Comprehensive Search Query filter (specifically handles male, female, unisex, names, notes, mood)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        // 1. Gender keywords matching
        const isMaleSearch = ['male', 'men', 'man', 'for him', 'him', 'masculine', 'gentleman'].some(
          (k) => query === k || query.includes(k)
        );
        const isFemaleSearch = ['female', 'women', 'woman', 'for her', 'her', 'feminine', 'lady'].some(
          (k) => query === k || query.includes(k)
        );
        const isUnisexSearch = ['unisex', 'genderless', 'shared', 'neutral'].some(
          (k) => query === k || query.includes(k)
        );

        const matchesGenderIntent =
          (isMaleSearch && (perfume.gender === 'male' || perfume.gender === 'unisex')) ||
          (isFemaleSearch && (perfume.gender === 'female' || perfume.gender === 'unisex')) ||
          (isUnisexSearch && perfume.gender === 'unisex');

        // 2. Name & Title matching
        const matchesName = perfume.name.toLowerCase().includes(query);
        const matchesSubtitle = perfume.subtitle.toLowerCase().includes(query);

        // 3. Notes & Accents matching
        const matchesAccent = perfume.accentNote.toLowerCase().includes(query);
        const matchesNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes].some((n) =>
          n.toLowerCase().includes(query)
        );

        // 4. Description, Mood & Occasions
        const matchesDescription = perfume.description.toLowerCase().includes(query) || perfume.story.toLowerCase().includes(query);
        const matchesMood = perfume.mood.toLowerCase().includes(query);
        const matchesCategory = perfume.categoryLabel.toLowerCase().includes(query);
        const matchesOccasions = perfume.occasions.some((o) => o.toLowerCase().includes(query));

        if (
          !matchesGenderIntent &&
          !matchesName &&
          !matchesSubtitle &&
          !matchesAccent &&
          !matchesNotes &&
          !matchesDescription &&
          !matchesMood &&
          !matchesCategory &&
          !matchesOccasions
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedGender, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGender('all');
    setSelectedCategory('all');
  };

  const handleApplyQuickSearch = (keyword: string) => {
    if (keyword.toLowerCase().includes('male') || keyword.toLowerCase().includes('him')) {
      setSelectedGender('male');
      setSearchQuery('');
    } else if (keyword.toLowerCase().includes('female') || keyword.toLowerCase().includes('her')) {
      setSelectedGender('female');
      setSearchQuery('');
    } else if (keyword.toLowerCase().includes('unisex')) {
      setSelectedGender('unisex');
      setSearchQuery('');
    } else {
      setSearchQuery(keyword);
    }
  };

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

  const quickSearchSuggestions = [
    { label: 'For Him (Male)', value: 'male' },
    { label: 'For Her (Female)', value: 'female' },
    { label: 'Unisex', value: 'unisex' },
    { label: 'Kannauj Rose', value: 'Kannauj' },
    { label: 'Mysore Sandalwood', value: 'Sandalwood' },
    { label: 'Wild Ruh Khus', value: 'Khus' },
    { label: 'Assam Oud', value: 'Oud' },
    { label: 'Aura Nocturna', value: 'Aura Nocturna' },
  ];

  return (
    <section id="collection" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            Haute Parfumerie Flacons · India Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            The Signature Collection
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Distilled in small batches harmonizing sacred Indian botanicals from Kannauj, Mysore, and Assam with French precision. Bottled in refillable crystal glass with 24k gold engravings.
          </p>
        </div>

        {/* Search & Comprehensive Filter Suite */}
        <div className="max-w-4xl mx-auto mb-12 space-y-5">
          {/* Main Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#78716C]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by gender (Male, Female, Unisex), perfume name (e.g. Aura Nocturna, Kannauj, Khus), or notes..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#D8CEBE] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A8A29E] hover:text-[#1C1917]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Recommendation Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] text-[#78716C] uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Suggested:
            </span>
            {quickSearchSuggestions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleApplyQuickSearch(item.value)}
                className="px-2.5 py-1 bg-white hover:bg-[#F4F0EA] border border-[#EAE4DC] hover:border-[#C5A880] text-[11px] text-[#57534E] hover:text-[#1C1917] transition-all cursor-pointer shadow-2xs"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Gender Filter Controls: Male / Female / Unisex */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                Scent Profile:
              </span>
              <div className="inline-flex items-center p-1 bg-[#F4F0EA] border border-[#EAE4DC] gap-1">
                {genderFilters.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGender(g.id as any)}
                    className={`px-3 py-1.5 text-[11px] tracking-wider uppercase font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedGender === g.id
                        ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count & reset */}
            <div className="flex items-center gap-3 text-xs text-[#78716C]">
              <span>
                Showing <strong className="text-[#1C1917] font-mono">{filteredPerfumes.length}</strong> of {PERFUMES.length} flacons
              </span>
              {(searchQuery || selectedGender !== 'all' || selectedCategory !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[#9E8055] hover:text-[#1C1917] flex items-center gap-1 font-medium transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Olfactory Family Filter Tabs */}
          <div className="flex items-center justify-center overflow-x-auto pb-1 scrollbar-none pt-1">
            <div className="inline-flex items-center p-1 bg-[#F4F0EA] border border-[#EAE4DC] gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-[11px] tracking-[0.1em] uppercase font-medium transition-all whitespace-nowrap cursor-pointer ${
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
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredPerfumes.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#EAE4DC] p-8 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#9E8055]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#1C1917]">No Fragrances Found</h3>
            <p className="text-xs text-[#57534E]">
              We couldn&apos;t find any flacon matching &ldquo;{searchQuery}&rdquo; with your selected filters. Try broadening your terms or reset the filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#332F2C]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
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

                  {/* Gender label badge & bestseller */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C1917] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 border border-[#EAE4DC]">
                      {perfume.genderLabel}
                    </span>
                    {perfume.bestseller && (
                      <span className="bg-[#1C1917]/90 text-[#FAF8F5] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1">
                        Signature Favorite
                      </span>
                    )}
                  </div>

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
                      <span>{perfume.genderLabel}</span>
                      <span aria-hidden="true">·</span>
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
        )}

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
