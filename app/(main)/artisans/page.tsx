import { fetchSellerUserProfiles } from '../lib/data';
import ScrollableContainer from '@/components/shared/ScrollableContainer/ScrollableContainer';
import styles from './artisans.module.css';
import ProfileCardWrapper from '@/components/main/ProfileForm/ProfileCardWrapper';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artisans',
  description: 'Meet the talented artisans behind the unique handmade products at Handcrafted Haven.',
};

export default async function Artisans() {
  const userProfiles = await fetchSellerUserProfiles();
  return (
    <>
      <div className={styles.artisans}>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Artisans', href: '/artisans' },
          ]}
        />
        <ScrollableContainer>
          <div className={styles.content}>
            <h1 className={styles.content__title}>Artisans</h1>
            <ProfileCardWrapper userProfiles={userProfiles} />
          </div>
        </ScrollableContainer>
      </div>

    </>);
}