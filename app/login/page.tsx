import { Suspense } from 'react';
import { Metadata } from 'next';
import LoginForm from '../ui/LoginForm/LoginForm';
import styles from './login.module.css';


export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <main className={styles.login}>
            <Suspense>
                <LoginForm />
            </Suspense>
        </main>
    );
}