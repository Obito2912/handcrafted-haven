import Image from 'next/image';
import styles from './login.module.css';
import { auth } from '@/auth';
import { fetchUserProfile } from '@/app/(main)/lib/data';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/auth/AuthFormWrapper/AuthFormWrapper';


export default async function LoginPage() {
    const session = await auth();
    console.log("Session:", session);
    console.log("User ID:", session?.user?.id);
    const userProfile = session?.user?.id ? await fetchUserProfile(session.user.id) : null;
    console.log("User profile fetched on login page:", userProfile);

    return (
        <>
            <div className={styles.login}>
                <Image className={styles.login__background} src="/login-bckgrd.jpg" alt="Login Background" fill />
                <div className={styles.login__formContainer}>
                    {userProfile ? (
                        <div className={styles.login__welcome}>
                            <h1>Welcome {userProfile.name}!</h1>
                            <p className={styles.login__message}>You are already signed in.</p>
                            <Link aria-label='Go to home page' className={styles.login__go_home} href="/">Go to Home Page</Link>
                        </div>
                    ) : (
                        <AuthFormWrapper />
                    )}
                </div>
            </div>
        </>
    );
}
