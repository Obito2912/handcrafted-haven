"use client";

import styles from "@/components/shared/Form/Form.module.css";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { handleAuth } from "../../../app/(main)/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function AuthForm({
  signup,
  setSignup,
}: {
  signup: boolean;
  setSignup: (value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(handleAuth, undefined);

  return (
    <form action={formAction} className={`${styles.form}`} aria-label={signup ? 'Sign Up Form' : 'Login Form'}>
      <input type="hidden" name="mode" value={signup ? "signup" : "login"} />
      {signup && (
        <>
          <label className={`${styles.form_label}`} htmlFor="name">
            Name
            <input
              className={`${styles.form_input}`}
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              aria-required="true" defaultValue={state?.values?.name}
              // Client-side validation: Prevent form submission if name is missing or too short
              // 'required' ensures field is not empty before submit
              required
              // 'minLength' enforces minimum 2 characters (matches backend Zod schema)
              minLength={2}
              // 'maxLength' prevents excessive input (100 chars max, matches backend)
              maxLength={100}
              // 'title' provides tooltip message shown on validation failure
              title="Name must be at least 2 characters"
            />
          </label>
        </>
      )}
      <label className={`${styles.form_label}`} htmlFor="email">
        Email
        <input
          className={`${styles.form_input}`}
          // HTML5 type="email" validates email format pattern automatically
          // Checks for: text@domain.extension format
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          aria-required="true" defaultValue={state?.values?.email}
          // Required field - browser prevents submit if empty
          required
          // Tooltip shown when validation fails
          title="Please enter a valid email address"
        />
      </label>
      <label className={`${styles.form_label}`} htmlFor="password">
        Password
        <input
          className={`${styles.form_input}`}
          type="password"
          id="password"
          name="password"
          autoComplete="current-password" aria-required="true" 
          // Required field validation
          required
          // Minimum 6 characters enforced (matches SignupFormSchema minimum)
          minLength={6}
          // Maximum 100 characters to prevent abuse
          maxLength={100}
          // User-friendly error message displayed on hover/focus
          title="Password must be at least 6 characters"
        />
      </label>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button type="submit" disabled={isPending}>
        {isPending && <span className="spinner" />}
        {signup ? "Sign Up" : "Login"}
      </button>
      <div className={`${styles.form_text_container}`}>
        <span className={`${styles.form_text}`}>
          {signup ? "Already have an account?" : "New here? Join the community"}
        </span>
        <button type="button" onClick={() => setSignup(!signup)} aria-label={signup ? 'Switch to Login' : 'Switch to Sign Up'}>
          {signup ? "Login" : "Sign Up"}
        </button>
      </div>
      <div className={styles.form_error} role="alert" aria-live="polite">
        {state?.message && (
          <>
            <ExclamationCircleIcon className={styles.form_error_icon} aria-hidden="true" />
            <p className={styles.form_error_text}>{state.message}</p>
          </>
        )}
      </div>
    </form>
  );
}
