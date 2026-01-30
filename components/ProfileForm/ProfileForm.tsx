'use client';

import styles from './AuthForm.module.css';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { handleAuth } from '@/app/(main)/lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function AuthForm({ signup, setSignup }: { signup: boolean; setSignup: (value: boolean) => void }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [state, formAction, isPending] = useActionState(
        handleAuth,
        undefined,
    );

    return (
        <form action={formAction} className={`${styles.form}`}>
            <input type="hidden" name="mode" value={signup ? 'signup' : 'login'} />
            {signup && <label className={`${styles.form_label}`} htmlFor="name">Name
                <input className={`${styles.form_input}`} type="text" id="name" name="name" autoComplete="name" defaultValue={state?.values?.name} />
            </label>}
            <label className={`${styles.form_label}`} htmlFor="email">Email
                <input className={`${styles.form_input}`} type="email" id="email" name="email" autoComplete="email" defaultValue={state?.values?.email} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="password">Password
                <input className={`${styles.form_input}`} type="password" id="password" name="password" autoComplete="current-password" />
            </label>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <button type="submit" disabled={isPending}>
                {isPending && <span className="spinner" />}
                {signup ? 'Sign Up' : 'Login'}</button>
            <div className={`${styles.form_text_container}`}>
                <span className={`${styles.form_text}`}>{signup ? 'Already have an account?' : 'New here? Join the community'}</span>
                <button type="button" onClick={() => setSignup(!signup)}>{signup ? 'Login' : 'Sign Up'}</button>
            </div>
            <div className="flex h-8 items-end space-x-1">
                {state?.message && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{state.message}</p>
                    </>
                )}
            </div>
        </form>
    );
}