"use client";

import styles from "@/components/shared/Form/Form.module.css";
import { useActionState } from "react";
import { updateUserProfile } from "@/app/(main)/lib/actions";
import type { ProfileFormState } from "@/app/(main)/lib/schemas/profileSchemas";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import type { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";

type ProfileFormProps = {
  initialValues?: UserProfileValue;
};

export default function ProfileForm({ initialValues }: ProfileFormProps) {
  const initialState: ProfileFormState = {
    message: null,
    success: false,
    values: {},
  };

  const [state, formAction] = useActionState(updateUserProfile, initialState);
  const hasMessage = Boolean(state?.message);
  const isSuccess = state?.success === true;
  return (
    <form
      action={formAction}
      className={`${styles.form}`}
      key={initialValues?.user_type} aria-label="Edit Profile Form"
    >
      <label className={`${styles.form_label}`} htmlFor="name">
        Name
        <input
          className={`${styles.form_input}`}
          type="text"
          id="name"
          name="name"
          autoComplete="name" required aria-required="true"
          defaultValue={state?.values?.name ?? initialValues?.name}
          // Name validation matching ProfileSchema: required, min 2, max 100
          minLength={2}
          maxLength={100}
          title="Name must be at least 2 characters"
        />
      </label>
      <label className={`${styles.form_label}`} htmlFor="age">
        Age
        <input
          className={`${styles.form_input}`}
          type="number"
          id="age"
          name="age"
          min={13} max={120} required aria-required="true" defaultValue={state?.values?.age ?? initialValues?.age}
          // Age range validation: 10-120 (matches backend ProfileSchema)
          // Min 10 ensures no children, max 120 is reasonable upper limit
          // Whole numbers only for age
          step="1"
          title="Age must be between 10 and 120"
        />
      </label>
      <label className={`${styles.form_label}`} htmlFor="bio">
        Bio
        <textarea
          className={`${styles.form_input}`}
          id="bio"
          name="bio"
          aria-label="Tell others about yourself" rows={3}
          defaultValue={state?.values?.bio ?? initialValues?.bio}
          // Bio max length 500 chars (matches backend schema)
          // Prevents excessively long bios that could break UI
          maxLength={500}
          title="Bio must be at most 500 characters"
        />
      </label>
      <label className={`${styles.form_label}`} htmlFor="gender">
        Gender
        <select
          className={`${styles.form_input}`}
          id="gender"
          name="gender"
          defaultValue={state?.values?.gender ?? initialValues?.gender} required aria-required="true"
          // Gender is required field (enum validation: "male" | "female")
          title="Please select your gender"
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      {/* <label htmlFor="profile-image">Profile Image URL
                <input className={`${styles.form_input}`} type="url" id="profile-image" name="image_url" autoComplete="profile-image" defaultValue={state?.values?.image_url ?? initialValues?.image_url} />
            </label> */}
      <label htmlFor="profile-image">
        Profile Image URL
        <input
          className={`${styles.form_input}`}
          type="text"
          id="profile-image"
          name="image_url"
          autoComplete="profile-image"
          defaultValue={state?.values?.image_url ?? initialValues?.image_url} aria-label="Profile Image URL"
          // Image URL limited to 200 chars (matches backend schema)
          // Prevents excessively long URLs that could cause database issues
          maxLength={200}
          title="Image URL must be at most 200 characters"
        />
      </label>
      <label className={`${styles.form_label}`} htmlFor="user_type">
        User Type
        <select
          className={`${styles.form_input}`}
          id="user_type"
          name="user_type"
          defaultValue={state?.values?.user_type ?? initialValues?.user_type} required aria-required="true"
          // User type is required (enum: "buyer" | "seller")
          // Determines user permissions and available features
          title="Please select your user type"
        >
          <option value="" disabled>
            Select your user type
          </option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </label>
      <input
        type="hidden"
        name="user_id"
        value={state?.values?.user_id ?? initialValues?.user_id}
      />
      <button type="submit" aria-label="Update Profile">Update Profile</button>

    <div
      className={styles.form_error}
      role={hasMessage ? (isSuccess ? "status" : "alert") : undefined}
      aria-live={hasMessage ? (isSuccess ? "polite" : "assertive") : undefined}
      aria-atomic={hasMessage ? true : undefined}
    >
      {hasMessage && (
        <>
          {!isSuccess && (
            <ExclamationCircleIcon
              className={styles.form_error_icon}
              aria-hidden="true"
            />
          )}
          <p className={isSuccess ? styles.form_success_text : styles.form_error_text}>
            {state.message}
          </p>
        </>
      )}
    </div>
    </form>
  );
}
