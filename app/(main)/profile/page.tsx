import ProfileForm from '@/components/main/ProfileForm/ProfileForm';
import { fetchUserProfile } from '../lib/data';
import { getLoggedInInfo } from '../lib/session';
import ScrollableContainer from '@/components/shared/ScrollableContainer/ScrollableContainer';
import styles from './profile.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Your Profile',
    description: 'View and edit your profile information at Handcrafted Haven.',
}

export default async function Profile() {
    const { userId } = await getLoggedInInfo();
    if (!userId) {
        return (
            <div className={styles.profile__message_container}>
                <p>You must be logged in to view this data.</p>
            </div>
        )
    }
    const userProfile = await fetchUserProfile(userId);

    return (
        <div className={styles.profile}>
            <ScrollableContainer>
                <ProfileForm initialValues={userProfile ?? undefined} />
            </ScrollableContainer>
        </div>
    );
}

