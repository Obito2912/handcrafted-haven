'use client';

import { useState, Suspense } from 'react';
import AuthForm from '../../../components/AuthForm/AuthForm';
import './AuthFormWrapper.css';

export default function AuthFormWrapper() {
    const [signup, setSignup] = useState(false);

    return (
        <>
            <h1 className="form__header">{signup ? 'Welcome, please sign up' : 'Welcome, please login'}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthForm signup={signup} setSignup={setSignup} />
            </Suspense>
        </>
    );
}