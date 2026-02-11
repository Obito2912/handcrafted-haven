import ProfileForm from "@/components/main/ProfileForm/ProfileForm";
import { fetchUserProfile } from "../lib/data";
import { getLoggedInInfo } from "../lib/session";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import styles from "./profile.module.css";

export default async function Profile() {
    const { userId } = await getLoggedInInfo();
    console.log("User ID in Profile page:", userId);
    if (!userId) {
        return (
            <main className={styles.main}>
                <p>You must be logged in to view this data.</p>
            </main>
        )
    }
    const userProfile = await fetchUserProfile(userId);

    return (
        <main className={styles.main}>
            <div className={styles.profile}>
                <ScrollableContainer>
                    <ProfileForm initialValues={userProfile ?? undefined} />
                </ScrollableContainer>
            </div>
        </main>
    );
}

