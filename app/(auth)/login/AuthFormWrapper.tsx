'use client';

import { useState, Suspense } from 'react';
import AuthForm from '../../../components/AuthForm/AuthForm';

export default function AuthFormWrapper() {
    const [signup, setSignup] = useState(false);

    return (
        <>
            <h1>{signup ? 'Welcome, please sign up' : 'Welcome, please login'}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthForm signup={signup} setSignup={setSignup} />
            </Suspense>
        </>
    );
}