import Image from 'next/image';
import styles from './login.module.css';
import { auth } from '@/auth';
import { fetchUserProfile } from '@/app/(main)/lib/data';
import Link from 'next/link';
import AuthFormWrapper from './AuthFormWrapper';


export default async function LoginPage() {
    const session = await auth();
    console.log("Session:", session);
    console.log("User ID:", session?.user?.id);
    const userProfileData = session?.user?.id ? await fetchUserProfile(session.user.id) : null;
    const userProfile = userProfileData?.userProfile;
    console.log("User profile fetched on login page:", userProfile);

    return (
        <>
            {/* <header className={styles.header}>
                <div>
                    <i className="fa-regular fa-house"></i>
                    <span className={styles.header__title}>HandCrafted Haven</span>
                    <i className="fa-solid fa-leaf"></i>
                </div>
            </header> */}
            <div className={styles.login}>
                <Image src="/login-bckgrd.jpg" alt="Login Background" fill />
                <div className={styles.login__formContainer}>
                    {userProfile ? (
                        <div className={styles.login__welcome}>
                            <h1>Welcome back, {userProfile.name}!</h1>
                            <p>You are already signed in.</p>
                            <Link href="/">Go to Home Page</Link>
                        </div>
                    ):  (
                        <AuthFormWrapper />
                    )}
                </div>
            </div>
        </>
    );
}
