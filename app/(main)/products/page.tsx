import EditableProductCardWrapper from '@/components/main/Products/EditableProductCardWrapper';
import { getLoggedInInfo } from '../lib/session';
import { fetchProductDataByUser } from '../lib/data';
import ScrollableContainer from '@/components/shared/ScrollableContainer/ScrollableContainer';
import Link from 'next/link';
import styles from './products.module.css';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Shop',
  description: 'View and manage your handmade products in your shop at Handcrafted Haven.',
};

export default async function Products() {
  const { session, userId, loggedIn } = await getLoggedInInfo();
  if (!userId) {
    return <div>Please log in to view your products.</div>;
  }
  const { productData, averageRatings } = await fetchProductDataByUser(userId);
  return (
    <div className={styles.products__container}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manage Shop', href: '/products' },
        ]}
      />
      <div className={styles.products}>
        <ScrollableContainer>
          <div className={styles.content}>
            <h1>My Products</h1>
            <p>This is the products page. Here you can find your products and manage them.</p>
            {/* generate random text */}            
            <Link href="/products/create">Create New Product</Link>
            <EditableProductCardWrapper products={productData} productRatings={averageRatings} />
          </div>
        </ScrollableContainer>
      </div>
    </div>
  );
}