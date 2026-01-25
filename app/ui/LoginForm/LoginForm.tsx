'use client';

import styles from './LoginForm.module.css';

export default function LoginForm() {
    return (
        <form className={`${styles.form}`}>
            <label className={`${styles.form_label}`} htmlFor="email">Email
                <input className={`${styles.form_input}`} type="email" id="email" autoComplete="email" />
            </label>
            <label className={`${styles.form_label}`} htmlFor="password">Password
                <input className={`${styles.form_input}`} type="password" id="password" autoComplete="current-password" />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}