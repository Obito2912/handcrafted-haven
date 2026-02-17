import EditableProductCardWrapper from '@/components/main/Products/EditableProductCardWrapper';
import { getLoggedInInfo } from '../../lib/session';
import { fetchProductDataByUser, fetchUserFavoriteProducts } from '../../lib/data';
import ScrollableContainer from '@/components/shared/ScrollableContainer/ScrollableContainer';
import Link from 'next/link';
import styles from '../products.module.css';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next';
import ProductCardWrapper from '@/components/main/Products/ProductCardWrapper';

export const metadata: Metadata = {
  title: 'My Favorite Products',
  description: 'View your favorite products at Handcrafted Haven.',
};

export default async function Favorites() {
  const { session, userId, loggedIn } = await getLoggedInInfo();
  if (!userId) {
    return <div>Please log in to view your favorite products.</div>;
  }
  const { productData, averageRatings, allRatings, userFavorites } = await fetchUserFavoriteProducts(userId);
  return (
    <div className={styles.products__container}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'My Favorite Products', href: '/products/favorites' },
        ]}
      />
      <div className={styles.products}>
        <ScrollableContainer>
          <div className={styles.content}>
            <h1>My Favorite Products</h1>
            <ProductCardWrapper products={productData} productRatings={averageRatings}  userFavoriteProducts={userFavorites} userId={userId}/>
          </div>
        </ScrollableContainer>
      </div>
    </div>
  );
}