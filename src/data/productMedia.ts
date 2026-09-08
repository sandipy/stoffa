// Authentic Stöffa product & on-model assets
import stoffaSuedeSlipper from '../assets/images/stoffa_suede_slipper_1788542974814.jpg';
import stoffaFoldoverTote from '../assets/images/stoffa_foldover_tote_1788542991697.jpg';
import stoffaBaboucheOnModel from '../assets/images/stoffa_babouche_onmodel_1788543438556.jpg';
import stoffaToteOnModel from '../assets/images/stoffa_tote_onmodel_1788543456061.jpg';
import stoffaBootOnModel from '../assets/images/stoffa_boot_onmodel_1788543478427.jpg';
import stoffaLoaferOnModel from '../assets/images/stoffa_loafer_onmodel_1788543496501.jpg';
import stoffaWeekenderOnModel from '../assets/images/stoffa_tote_onmodel_1788543456061.jpg';
import stoffaChelseaBoot from '../assets/images/stoffa_chelsea_boot_1788543960314.jpg';
import stoffaPennyLoafer from '../assets/images/stoffa_penny_loafer_1788543975250.jpg';
import stoffaPointedSlingback from '../assets/images/stoffa_pointed_slingback_1788543995844.jpg';
import stoffaSuedeMule from '../assets/images/stoffa_suede_slipper_1788542974814.jpg';

// Authentic luxury female model assets
import blackModelHero from '../assets/images/black_model_hero_1788747095466.jpg';
import asianModelHero from '../assets/images/asian_model_hero_1788747108983.jpg';
import indianModelHero from '../assets/images/indian_model_hero_1788747121553.jpg';
import stoffaAmericanModel from '../assets/images/stoffa_american_model_1788621044824.jpg';
import stoffaAmericanFootwear from '../assets/images/stoffa_american_footwear_1788621069738.jpg';
import stoffaUsModelTote from '../assets/images/stoffa_us_model_tote_1788621090372.jpg';
import stoffaUsModelHeels from '../assets/images/stoffa_us_model_heels_1788621100977.jpg';
import stoffaUsModelBanner from '../assets/images/stoffa_us_model_tote_1788621090372.jpg';

import { ProductAngle } from '../types';

export const AI_MEDIA_ASSETS = {
  stoffaSuedeSlipper,
  stoffaFoldoverTote,
  stoffaBaboucheOnModel,
  stoffaToteOnModel,
  stoffaBootOnModel,
  stoffaLoaferOnModel,
  stoffaWeekenderOnModel,
  stoffaChelseaBoot,
  stoffaPennyLoafer,
  stoffaPointedSlingback,
  stoffaSuedeMule,
  blackModelHero,
  stoffaAmericanModel,
  asianModelHero,
  indianModelHero,
  stoffaAmericanFootwear,
  stoffaUsModelTote,
  stoffaUsModelHeels,
  stoffaUsModelBanner,
};

/**
 * Returns a tailored set of curated angles where ONLY authentic Stöffa product shots
 * and AI American models wearing Stöffa strictly are used.
 */
export function getProductAngles(
  id: string,
  category: string,
  baseImages: string[]
): ProductAngle[] {
  const validBase = (baseImages || []).filter(
    (u) =>
      typeof u === 'string' &&
      u.length > 0 &&
      !u.includes('unsplash.com') &&
      !u.includes('placeholder') &&
      !u.toUpperCase().includes('ALIA') &&
      !u.toUpperCase().includes('KARINA') &&
      !u.toUpperCase().includes('KAREENA') &&
      !u.toUpperCase().includes('MADHURI') &&
      !u.toUpperCase().includes('RASHMIKA') &&
      !u.toUpperCase().includes('SHREYA') &&
      !u.toUpperCase().includes('SONALI') &&
      !u.toUpperCase().includes('KARISHMA') &&
      !u.toUpperCase().includes('GENELIA') &&
      !u.toUpperCase().includes('BHAVANA')
  );

  // If the product is sourced from stoffastyle.com with authentic studio shots
  if (validBase.length > 0 && validBase.some((u) => u.includes('stoffastyle.com') || u.includes('cdn.shopify.com'))) {
    return validBase.map((url, i) => {
      const u = url.toUpperCase();
      if (u.includes('_A.') || u.includes('_A_') || u.includes('_FRONT')) {
        return { url, label: 'Front Angle Perspective', tag: 'Hero Front', shotType: 'hero' };
      }
      if (u.includes('_L.') || u.includes('_L_') || u.includes('_SIDE')) {
        return { url, label: 'Architectural Profile', tag: 'Side Silhouette', shotType: 'side' };
      }
      if (u.includes('_P.') || u.includes('_P_') || u.includes('_DETAIL')) {
        return { url, label: 'Metallic Braid & Footbed Detail', tag: 'Close-up Detail', shotType: 'detail' };
      }
      if (u.includes('_B.') || u.includes('_B_') || u.includes('_BACK')) {
        return { url, label: 'Heel & Arch Silhouette', tag: 'Back View', shotType: 'side' };
      }
      if (u.includes('_T.') || u.includes('_T_') || u.includes('_TOE')) {
        return { url, label: 'Toe Loop Craftsmanship', tag: 'Toe Detail', shotType: 'detail' };
      }
      if (u.includes('_R.') || u.includes('_R_')) {
        return { url, label: 'Right Profile Silhouette', tag: 'Right Profile', shotType: 'side' };
      }
      return { url, label: `Artisanal Studio Angle ${i + 1}`, tag: 'Studio Shot', shotType: 'hero' };
    });
  }

  // 1. The Stöffa Suede Slip-On Babouche
  if (id === 'stoffa_01' || id === 'ww_10') {
    return [
      {
        url: stoffaSuedeSlipper,
        label: 'Studio Hero: Stöffa Suede Babouche',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaSuedeMule,
        label: 'Architectural Profile & Collapsible Heel',
        tag: 'Side Profile',
        shotType: 'side',
      },
      {
        url: stoffaAmericanFootwear,
        label: 'American Model: Wearing Stöffa Suede Babouche',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Close-up: American model wearing chocolate brown suede Stöffa babouche slipper with cropped ivory linen trousers',
        shotType: 'ai_cu',
      },
      {
        url: stoffaBaboucheOnModel,
        label: 'On-Model: Florentine Courtyard Walk',
        tag: 'On-Model Lookbook',
        shotType: 'side',
      },
      {
        url: asianModelHero,
        label: 'Luxury Model: Coastal Terrace Lifestyle',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Full silhouette: Model walking on seaside terrace wearing relaxed tailoring and handcrafted footwear',
        shotType: 'ai_full',
      },
    ];
  }

  // 2. The Stöffa Soft Foldover Nappa Carryall Tote
  if (id === 'stoffa_02' || id === 'ww_08') {
    return [
      {
        url: stoffaFoldoverTote,
        label: 'Studio Hero: Stöffa Foldover Nappa Tote',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: stoffaUsModelTote,
        label: 'American Model: Carrying Foldover Nappa Tote',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Editorial street style: American model in Manhattan carrying the cognac Stöffa foldover tote over shoulder',
        shotType: 'ai_cu',
      },
      {
        url: stoffaToteOnModel,
        label: 'On-Model: Soft Foldover Nappa Tote',
        tag: 'On-Model',
        shotType: 'side',
      },
      {
        url: stoffaAmericanModel,
        label: 'American Model: Draped Stöffa Linen & Carryall',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Full runway silhouette: American model wearing Stöffa draped tailoring and carrying the soft leather carryall tote',
        shotType: 'ai_full',
      },
    ];
  }

  // 3. The Stöffa Pleated Elastic-Gore Boot
  if (id === 'stoffa_03' || id === 'stoffa_09') {
    return [
      {
        url: stoffaChelseaBoot,
        label: 'Studio Hero: Stöffa Pleated Chelsea Boot',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaBootOnModel,
        label: 'Micro-Pleated Leather Stretch Gore Profile',
        tag: 'Side Contour',
        shotType: 'side',
      },
      {
        url: stoffaAmericanFootwear,
        label: 'American Model: Wearing Stöffa Chelsea Boot',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Close-up: American model wearing Stöffa handcrafted boots with tailored trousers',
        shotType: 'ai_cu',
      },
      {
        url: blackModelHero,
        label: 'Luxury Model: Tailored Lookbook',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Full silhouette: Model wearing handcrafted architectural footwear with tailored trousers',
        shotType: 'ai_full',
      },
    ];
  }

  // 4. The Stöffa Sculptural Pointed Slingback & Heels
  if (id === 'stoffa_04' || id === 'ww_09' || id === 'stoffa_12' || id === 'stoffa_14') {
    return [
      {
        url: stoffaPointedSlingback,
        label: 'Studio Hero: Stöffa Pointed Slingback',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaUsModelHeels,
        label: 'American Model: Wearing Pointed Sculpted Heels',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'American model wearing Stöffa sculptural kitten slingback heels with tailored silk dress',
        shotType: 'ai_cu',
      },
      {
        url: stoffaSuedeMule,
        label: 'Architectural Heel Contour Profile',
        tag: 'Side Heel Contour',
        shotType: 'side',
      },
      {
        url: stoffaAmericanModel,
        label: 'American Model: Stöffa Evening Edit',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Full editorial: American model in Stöffa resort tailoring and elegant heels',
        shotType: 'ai_full',
      },
    ];
  }

  // 5. The Stöffa Water-Repellent Suede Weekender Duffel
  if (id === 'stoffa_05' || id === 'ww_07') {
    return [
      {
        url: stoffaFoldoverTote,
        label: 'Studio Hero: Stöffa Suede Weekender Duffel',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: stoffaWeekenderOnModel,
        label: 'Bridle Leather Harness Straps Profile',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: stoffaUsModelTote,
        label: 'American Model: Travel & Transit Look',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'American model in tailored outerwear carrying Stöffa travel bag',
        shotType: 'ai_cu',
      },
      {
        url: indianModelHero,
        label: 'Luxury Model: Travel & Transit Lookbook',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Full travel look: Model styled in luxury resort tailoring and handcrafted artisanal luggage',
        shotType: 'ai_full',
      },
    ];
  }

  // 6. The Stöffa Deconstructed Hand-Turned Penny Loafer
  if (id === 'stoffa_06' || id === 'stoffa_16') {
    return [
      {
        url: stoffaPennyLoafer,
        label: 'Studio Hero: Stöffa Penny Loafer',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaLoaferOnModel,
        label: 'Raw-Cut Saddle & Unlined Profile',
        tag: 'Side Profile',
        shotType: 'side',
      },
      {
        url: stoffaAmericanFootwear,
        label: 'American Model: Wearing Stöffa Loafer',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Close-up: American model wearing Stöffa deconstructed suede loafers with pleated ecru trousers',
        shotType: 'ai_cu',
      },
      {
        url: asianModelHero,
        label: 'Luxury Model: Modernist Tailoring Lookbook',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Full lookbook: Model in resort tailoring and handcrafted footwear',
        shotType: 'ai_full',
      },
    ];
  }

  // 7. Bags & Totes General
  const isBag =
    category.toLowerCase().includes('bag') ||
    category.toLowerCase().includes('tote') ||
    category.toLowerCase().includes('accessories');

  if (isBag) {
    return [
      {
        url: validBase[0] || stoffaFoldoverTote,
        label: 'Studio Hero: Stöffa Handcrafted Carryall',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: stoffaUsModelTote,
        label: 'American Model: Carrying Stöffa Leather Bag',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'American model wearing Stöffa tailored coat and carrying leather carryall',
        shotType: 'ai_cu',
      },
      {
        url: stoffaToteOnModel,
        label: 'On-Model: Draped Leather Carryall',
        tag: 'On-Model',
        shotType: 'side',
      },
      {
        url: stoffaAmericanModel,
        label: 'American Model: Full Lookbook Editorial',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'Full runway silhouette: American model styled with Stöffa bag',
        shotType: 'ai_full',
      },
    ];
  }

  // 8. Resort, Dresses & Apparel
  const isApparel =
    category.toLowerCase().includes('dress') ||
    category.toLowerCase().includes('resort') ||
    category.toLowerCase().includes('separates') ||
    category.toLowerCase().includes('mommy');

  if (isApparel) {
    return [
      {
        url: stoffaAmericanModel,
        label: 'American Model: Wearing Stöffa Resort Silhouette',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'American model wearing Stöffa airy draped linen overshirt and relaxed trousers',
        shotType: 'hero',
      },
      {
        url: stoffaUsModelBanner,
        label: 'American Models: Stöffa Seaside Promenade',
        tag: 'American Model in Stöffa',
        isAiImage: true,
        aiDescription: 'American models wearing Stöffa vacation tailoring walking along sunny coastal boardwalk',
        shotType: 'side',
      },
      {
        url: asianModelHero,
        label: 'Luxury Model: Beach to Table Lifestyle',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Model at seaside terrace in effortless resort tailoring',
        shotType: 'detail',
      },
      {
        url: blackModelHero,
        label: 'Luxury Model: Linen & Metallic Ensemble',
        tag: 'On-Model',
        isAiImage: true,
        aiDescription: 'Model in signature resortwear and relaxed tailoring',
        shotType: 'ai_full',
      },
    ];
  }

  // 9. Footwear Default (Boots, Loafers, Mules)
  const isBoot = category.toLowerCase().includes('boot');
  const isLoaferOrFlat =
    category.toLowerCase().includes('flat') ||
    category.toLowerCase().includes('loafer');

  const onModelCloseUp = isBoot
    ? stoffaBootOnModel
    : isLoaferOrFlat
    ? stoffaAmericanFootwear
    : stoffaUsModelHeels;

  const onModelFull = isBoot
    ? stoffaBootOnModel
    : isLoaferOrFlat
    ? blackModelHero
    : stoffaAmericanModel;

  return [
    {
      url: validBase[0] || (isLoaferOrFlat ? stoffaPennyLoafer : stoffaSuedeMule),
      label: 'Studio Hero: Stöffa Footwear',
      tag: 'Front Perspective',
      shotType: 'hero',
    },
    {
      url: onModelCloseUp,
      label: 'American Model: Wearing Stöffa Footwear',
      tag: 'American Model in Stöffa',
      isAiImage: true,
      aiDescription: 'American model feet and legs styled wearing handcrafted Stöffa footwear with tailored trousers',
      shotType: 'ai_cu',
    },
    {
      url: stoffaSuedeSlipper,
      label: 'Tuscan Leather & Hand-Turned Sole',
      tag: 'Craft Close-Up',
      shotType: 'detail',
    },
    {
      url: onModelFull,
      label: 'American Model: Full Editorial Silhouette',
      tag: 'American Model in Stöffa',
      isAiImage: true,
      aiDescription: 'Full runway silhouette: American model wearing Stöffa footwear with relaxed linen and wool tailoring',
      shotType: 'ai_full',
    },
  ];
}
