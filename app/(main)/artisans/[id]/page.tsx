import ScrollableContainer from '@/components/shared/ScrollableContainer/ScrollableContainer';
import { fetchUserInformation, fetchUserProfile, fetchUserProducts } from '@/app/(main)/lib/data';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import ArtisansDisplay from '@/components/main/Artisans/ArtisansDisplay';
import ArtisansProductDisplay from '@/components/main/Artisans/ArtisansProductDisplay';
import styles from '../artisans.module.css';
import { Metadata } from 'next';
import { getLoggedInInfo } from '../../lib/session';

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const userProfile = await fetchUserProfile(params.id);

  return {
    title: userProfile?.name ?? 'Artisan',
    description: `Discover ${userProfile?.name ?? 'this artisan'}'s unique handmade products and craftsmanship at Handcrafted Haven.`,
  };
}

export default async function Artisans(
  props: { params: Promise<{ id: string }> }
) {
  const { userId } = await getLoggedInInfo();
  const params = await props.params;
  console.log(`Fetching artisan profile for user ID ${params.id}...`);
  // Fetch data
  const user = await fetchUserInformation(params.id);
  const userProfile = await fetchUserProfile(params.id);
  const { productData, averageRatings, allRatings, userFavorites } = await fetchUserProducts(params.id);

  return (
    <>
      <div className={styles.artisans}>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Artisans', href: '/artisans' },
            { label: userProfile?.name ?? 'Artisan', href: `/artisans/${params.id}`, active: true },
          ]}
        />
        <ScrollableContainer>
          <div className={styles.content}>
            <ArtisansDisplay userProfile={userProfile} user={user}></ArtisansDisplay>
            <ArtisansProductDisplay products={productData} productRatings={averageRatings} userFavoriteProducts={userFavorites} userId={userId}></ArtisansProductDisplay>
            </div>
        </ScrollableContainer>
      </div>
    </>
  );
}

