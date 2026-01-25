'use client';

import styles from './AuthForm.module.css';

export default function AuthForm({ signup, setSignup }: { signup: boolean; setSignup: (value: boolean) => void }) {

    return (
        <form className={`${styles.form}`}>
            {signup && <label className={`${styles.form_label}`} htmlFor="name">Name
                <input className={`${styles.form_input}`} type="text" id="name" autoComplete="name" />
            </label>}
            <label className={`${styles.form_label}`} htmlFor="email">Email
                <input className={`${styles.form_input}`} type="email" id="email" autoComplete="email" />
            </label>
            <label className={`${styles.form_label}`} htmlFor="password">Password
                <input className={`${styles.form_input}`} type="password" id="password" autoComplete="current-password" />
            </label>
            <button type="submit">{signup ? 'Sign Up' : 'Login'}</button>
            <div className={`${styles.form_text_container}`}>
                <span className={`${styles.form_text}`}>{signup ? 'Already have an account?' : 'New here? Join the community'}</span>
                <button type="button" onClick={() => setSignup(!signup)}>{signup ? 'Login' : 'Sign Up'}</button>
            </div>
        </form>
    );
}