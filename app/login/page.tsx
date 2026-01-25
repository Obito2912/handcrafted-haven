'use client';

import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import AuthForm from '../ui/AuthForm/AuthForm';
import styles from './login.module.css';
import { useState } from 'react';


export default function LoginPage() {
    const [signup, setSignup] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <div>
                    <i className="fa-regular fa-house"></i>
                    <span className={styles.header__title}>HandCrafted Haven</span>
                    <i className="fa-solid fa-leaf"></i>
                </div>
            </header>
            <main className={styles.login}>
                <Image src="/login-bckgrd.jpg" alt="Login Background" fill />
                <div className={styles.login__formContainer}>
                    <h1>{signup ? 'Welcome, please sign up' : 'Welcome, please login'}</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthForm signup={signup} setSignup={setSignup} />
                    </Suspense>
                </div>
            </main>
        </>
    );
}