import React, { useState } from 'react';
import { BookOpen, Heart, X, Award, ShieldCheck } from 'lucide-react';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';
import { useCommerce } from '../context/CommerceContext';
import { FadeInSection } from './FadeInSection';

export const BeachToTableStory: React.FC = () => {
  const { t } = useCommerce();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const handleScrollToCategories = () => {
    const el = document.getElementById('category-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#fbf9f5] py-14 border-y border-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection direction="up" duration={800}>
          <div className="bg-white rounded-[4px] border border-amber-100/90 shadow-sm p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Image Frame with authentic craftsmanship photo from stoffastyle.com */}
            <div className="w-full md:w-5/12 shrink-0">
              <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden shadow-md border border-amber-100 bg-amber-50 group">
                <img
                  src={STOFFA_BRAND_ASSETS.craftsmanshipEditorial1}
                  alt="Stoffa Style Handcrafted Footwear & Workshop Mumbai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 border border-white/50 flex items-center gap-1.5">
                  <span>{t('Handcrafted in Mumbai', 'Handcrafted in Mumbai')}</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Content */}
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('The Atelier Philosophy • stoffastyle.com', 'The Atelier Philosophy • stoffastyle.com')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-medium tracking-tight">
                {t('Indian Craftsmanship Meets Modern Luxury', 'Indian Craftsmanship Meets Modern Luxury')}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                {t('Stoffa Style was founded with a passion to redefine classic Indian footwear through artisanal craftsmanship and contemporary ergonomics. Every pair of our Kolhapuri wedges, metallic braided flats, and embellished potlis is designed and manufactured in-house, pairing heritage techniques with our signature dual-density memory foam footbed for unmatched day-to-night comfort.', 'Stoffa Style was founded with a passion to redefine classic Indian footwear through artisanal craftsmanship and contemporary ergonomics. Every pair of our Kolhapuri wedges, metallic braided flats, and embellished potlis is designed and manufactured in-house, pairing heritage techniques with our signature dual-density memory foam footbed for unmatched day-to-night comfort.')}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  id="beach-to-table-our-story-btn"
                  onClick={() => setIsStoryModalOpen(true)}
                  className="px-6 py-3 rounded-xl btn-champagne-primary font-semibold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('OUR STORY', 'OUR STORY')}</span>
                </button>
                <button
                  id="beach-to-table-shop-now-btn"
                  onClick={handleScrollToCategories}
                  className="text-xs font-semibold text-amber-900 hover:text-amber-700 tracking-wider uppercase underline underline-offset-4 cursor-pointer"
                >
                  {t('DISCOVER THE COLLECTION →', 'DISCOVER THE COLLECTION →')}
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Our Story Modal */}
      {isStoryModalOpen && (
        <div
          id="story-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsStoryModalOpen(false)}
        >
          <div
            id="story-modal-container"
            className="bg-white rounded-[4px] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="story-modal-close-btn"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-5 end-5 p-2 rounded-[4px] hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-700 text-xs font-mono uppercase tracking-widest font-bold mb-2">
              <span>{t('stoffastyle.com • Mumbai Flagship', 'stoffastyle.com • Mumbai Flagship')}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-medium mb-4">
              {t('The Stoffa Style Journey', 'The Stoffa Style Journey')}
            </h3>

            <div className="space-y-4 text-sm text-slate-600 font-light leading-relaxed">
              <p>
                {t("Founded and crafted in Mumbai, Stoffa Style brings women's handcrafted footwear and accessories to life. From our Mumbai flagship boutique to over 50 designer stores across India, we have dressed brides, celebrities, and women around the globe who seek effortless elegance.", "Founded and crafted in Mumbai, Stoffa Style brings women's handcrafted footwear and accessories to life. From our Mumbai flagship boutique to over 50 designer stores across India, we have dressed brides, celebrities, and women around the globe who seek effortless elegance.")}
              </p>
              <p>
                {t('Our signature Kolhapuri wedges are engineered with high-density cushioning to support you through 12-hour wedding celebrations, festive sangeets, and vacation strolls without sacrificing aesthetic beauty.', 'Our signature Kolhapuri wedges are engineered with high-density cushioning to support you through 12-hour wedding celebrations, festive sangeets, and vacation strolls without sacrificing aesthetic beauty.')}
              </p>
              <div className="p-4 rounded-[4px] bg-amber-50/70 border border-amber-200/60 text-amber-950 flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs italic leading-relaxed">
                  &ldquo;{t('We take immense pride in preserving Indian heritage footwear while transforming it with contemporary metallic palettes and modern comfort.', 'We take immense pride in preserving Indian heritage footwear while transforming it with contemporary metallic palettes and modern comfort.')}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="px-6 py-2.5 rounded-xl btn-champagne-primary text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t('Close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
