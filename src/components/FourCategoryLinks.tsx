import React, { useMemo } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { FadeInSection } from './FadeInSection';
import { categoryToUrl } from '../utils/navigationRouter';
import modelShoesImg from '../assets/images/shoes_hero_model_1788745307294.jpg';
import modelBagsImg from '../assets/images/bags_hero_model_1788745321490.jpg';
import modelSaleImg from '../assets/images/stoffa_sale_model_1788639332319.jpg';
import modelReadyImg from '../assets/images/stoffa_ready_model_1788641087680.jpg';
import blackModelHero from '../assets/images/black_model_hero_1788747095466.jpg';
import asianModelHero from '../assets/images/asian_model_hero_1788747108983.jpg';
import indianModelHero from '../assets/images/indian_model_hero_1788747121553.jpg';
import cocktailHeroImg from '../assets/images/cocktail_soiree_hero_1788745390554.jpg';
import festiveHeroImg from '../assets/images/festive_brunch_hero_1788745376178.jpg';

interface CategoryCardItem {
  id: string;
  title: string;
  subtitle: string;
  categoryTarget: string;
  imageUrl: string;
  altText: string;
}

const SHOES_IMAGE_POOL = [modelShoesImg, blackModelHero, asianModelHero, indianModelHero];
const BAGS_IMAGE_POOL = [modelBagsImg, cocktailHeroImg, festiveHeroImg];
const SALE_IMAGE_POOL = [modelSaleImg, blackModelHero, asianModelHero];
const READY_IMAGE_POOL = [modelReadyImg, indianModelHero, cocktailHeroImg];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const FourCategoryLinks: React.FC = () => {
  const { setSelectedCategory, clearFilters, t } = useCommerce();
  const { cmsData } = useCms();

  const categoryCards = cmsData.pages.homepage.categoryCards;

  // Cards using custom chosen images or falling back to curated pools
  const cards: CategoryCardItem[] = useMemo(() => {
    const shoesMeta = categoryCards?.shoes || {
      title: 'Shoes',
      subtitle: 'Architectural Wedges & Hand-Braided Straps',
      imageUrl: '',
      categoryTarget: 'Shoes',
    };
    const bagsMeta = categoryCards?.bags || {
      title: 'Bags',
      subtitle: 'Hand-Embroidered Antique Zardozi Potlis',
      imageUrl: '',
      categoryTarget: 'Bags',
    };
    const saleMeta = categoryCards?.sale || {
      title: 'Sale',
      subtitle: 'Curated Heritage & Rare Archive Editions',
      imageUrl: '',
      categoryTarget: 'Sale',
    };
    const readyMeta = categoryCards?.ready || {
      title: 'Ready to Ship',
      subtitle: 'Dispatched Within 24 Hours Worldwide',
      imageUrl: '',
      categoryTarget: 'Ready to Ship',
    };

    return [
      {
        id: 'shoes',
        title: shoesMeta.title,
        subtitle: shoesMeta.subtitle,
        categoryTarget: shoesMeta.categoryTarget || 'Shoes',
        imageUrl: shoesMeta.imageUrl || getRandomItem(SHOES_IMAGE_POOL),
        altText: 'Stoffa Style Signature Handcrafted Footwear - Model Wearing Classic High K Wedges',
      },
      {
        id: 'bags',
        title: bagsMeta.title,
        subtitle: bagsMeta.subtitle,
        categoryTarget: bagsMeta.categoryTarget || 'Bags',
        imageUrl: bagsMeta.imageUrl || getRandomItem(BAGS_IMAGE_POOL),
        altText: 'Stoffa Style Luxury Handcrafted Bags - Model Holding Embellished Antique Zardozi Potli Bag',
      },
      {
        id: 'sale',
        title: saleMeta.title,
        subtitle: saleMeta.subtitle,
        categoryTarget: saleMeta.categoryTarget || 'Sale',
        imageUrl: saleMeta.imageUrl || getRandomItem(SALE_IMAGE_POOL),
        altText: 'Stoffa Style Curated Sale - Model Wearing Handcrafted Metallic Wedges',
      },
      {
        id: 'ready-to-ship',
        title: readyMeta.title,
        subtitle: readyMeta.subtitle,
        categoryTarget: readyMeta.categoryTarget || 'Ready to Ship',
        imageUrl: readyMeta.imageUrl || getRandomItem(READY_IMAGE_POOL),
        altText: 'Stoffa Style Ready to Ship - Model Holding Handcrafted Silk Zardozi Clutch and Wedges',
      },
    ];
  }, [categoryCards]);

  const handleCardClick = (categoryTarget: string) => {
    clearFilters();
    setSelectedCategory(categoryTarget);
    const targetUrl = categoryToUrl(categoryTarget);
    if (window.location.hash !== targetUrl) {
      window.location.hash = targetUrl;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="category-links-section" className="w-full bg-[#faf9f6] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditableText target={{ type: 'category_cards' }} label="Edit 4 Category Cards">
          {/* 2x2 Grid with 4px corners, strictly no pill backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {cards.map((card, idx) => (
              <FadeInSection
                key={card.id}
                direction="up"
                delay={idx * 120}
                duration={800}
                distance={24}
              >
                <div
                  id={`card-${card.id}`}
                  onClick={() => handleCardClick(card.categoryTarget)}
                  className="group relative cursor-pointer bg-white rounded-[4px] overflow-hidden border border-stone-200/90 hover:border-stone-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 h-full"
                >
                  {/* Photo Container: 4px corners, height and object-top framing to ensure head is never cut off */}
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden bg-stone-100 rounded-[4px]">
                    <img
                      src={card.imageUrl}
                      alt={card.altText}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Ambient bottom gradient for text contrast - completely seamless, no box */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

                    {/* 
                      BOX REMOVED: 100% SEE-THROUGH / BOX-FREE LAYOUT
                      Shoes and bags are completely visible without any dark box overlay.
                      Contrasting text in pure white with drop shadows.
                    */}
                    <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 z-20 text-white flex flex-col items-center justify-end text-center">
                      <h3
                        style={{ color: '#ffffff' }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold !text-white text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300"
                      >
                        {t(card.title, card.title)}
                      </h3>
                      <p
                        style={{ color: '#ffffff' }}
                        className="text-xs sm:text-sm !text-white text-white italic mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      >
                        {t(card.subtitle, card.subtitle)}
                      </p>
                      <span
                        style={{ color: '#ffffff' }}
                        className="inline-block mt-3 px-5 py-2 bg-white/20 hover:bg-white/35 !text-white text-white text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold border border-white/75 rounded-[4px] transition-all duration-200 backdrop-blur-xs shadow-md"
                      >
                        &ndash; {t('Shop Collection', 'Shop Collection')} &ndash;
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </EditableText>
      </div>
    </section>
  );
};
