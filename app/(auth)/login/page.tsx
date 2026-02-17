import Image from "next/image";
import styles from "./login.module.css";
import { auth } from "@/auth";
import { fetchUserProfile } from "@/app/(main)/lib/data";
import Link from "next/link";
import AuthFormWrapper from "../../../components/auth/AuthFormWrapper/AuthFormWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your Handcrafted Haven account to access personalized features and manage your profile.",
};

export default async function LoginPage() {
    const session = await auth();
    const userProfile = session?.user?.id ? await fetchUserProfile(session.user.id) : null;

    return (
        <div className={styles.login}>
            <Image className={styles.login__background} src="/login-bckgrd.jpg" alt="Login Background" fill aria-hidden="true" priority />
            <div className={styles.login__formContainer}>
                {userProfile ? (
                    <section className={styles.login__welcome} aria-label='Welcome message'>
                        <h1>Welcome {userProfile.name}!</h1>
                        <p className={styles.login__message}>You are already signed in.</p>
                        <Link aria-label='Go to home page' className={styles.login__go_home} href="/">Go to Home Page</Link>
                    </section>
                ) : (
                    <AuthFormWrapper />
                )}
            </div>
        </div>
    );
}
