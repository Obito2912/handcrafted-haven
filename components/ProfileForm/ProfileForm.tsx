'use client';

import styles from './ProfileForm.module.css';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { updateUserProfile } from '@/app/(main)/lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function ProfileForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [state, formAction] = useActionState(
        updateUserProfile,
        undefined,
    );

    return (
        <form action={formAction} className={`${styles.form}`}>
            {<label className={`${styles.form_label}`} htmlFor="name">Name
                <input className={`${styles.form_input}`} type="text" id="name" name="name" autoComplete="name" defaultValue={state?.values?.name}  />
            </label>}
            <label className={`${styles.form_label}`} htmlFor="age">Age
                <input className={`${styles.form_input}`} type="number" id="age" name="age" defaultValue={state?.values?.age}  />
            </label>
            <label className={`${styles.form_label}`} htmlFor="bio">Bio
                <textarea className={`${styles.form_input}`} id="bio" name="bio" rows={3} defaultValue={state?.values?.bio} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="gender">Gender
                <select className={`${styles.form_input}`} id="gender" name="gender" defaultValue={state?.values?.gender}>
                    <option value="" disabled>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <label className={`${styles.form_label}`} htmlFor="image_url">Image URL
                <input className={`${styles.form_input}`} type="text" id="image_url" name="image_url" defaultValue={state?.values?.image_url} />
            </label>
            
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <button type="submit">
            Update Profile
            </button>

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