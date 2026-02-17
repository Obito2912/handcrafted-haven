import { UserProfileValue } from './schemas/profileSchemas';
import { ProductValue } from './schemas/productSchema';
import { Product, ProductCategories, UserProfile } from './definitions';

export function toUserProfileValues(
  profile: UserProfile | null,
): UserProfileValue {
  return {
    user_id: profile?.user_id || '',
    name: profile?.name || '',
    bio: profile?.bio || '',
    gender: profile?.gender === 'male' ? 'male' : 'female',
    image_url: profile?.image_url || '',
    age: profile?.age || undefined,
    user_type: profile?.user_type === 'seller' ? 'seller' : 'buyer',
  };
}

export function toProductValue(product: Product | null): ProductValue {
  return {
    product_id: product?.product_id || '',
    title: product?.title || '',
    description: product?.description || '',
    image_url: product?.image_url || '',
    userId: product?.user_id || '',
    quantity: product?.quantity || 0,
    price: product?.price || 0,
    category: product?.category || ProductCategories[0],
  };
}


