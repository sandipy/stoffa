// Centralized curated image library sourcing all 135+ images from the media folder
import { ALL_MEDIA_IMAGES, MediaImageItem, MEDIA_CATEGORIES } from './allMediaImages';

export interface CuratedImageOption {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  recommendedFor?: ('shoes' | 'bags' | 'sale' | 'ready')[];
}

// All 135+ media folder images mapped as CuratedImageOption
export const CURATED_IMAGE_LIBRARY: CuratedImageOption[] = ALL_MEDIA_IMAGES.map((img) => ({
  id: img.id,
  name: img.title,
  category: img.category,
  description: img.description,
  imageUrl: img.url,
  recommendedFor: img.recommendedFor,
}));

export { ALL_MEDIA_IMAGES, MEDIA_CATEGORIES };
