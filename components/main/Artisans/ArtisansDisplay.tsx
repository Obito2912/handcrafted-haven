import { User } from "@/app/(main)/lib/definitions";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";
import Image from "next/image";
import styles from "./ArtisansDisplay.module.css";

type ArtisansDisplayProps = {
  userProfile: UserProfileValue;
  user: User;
};

export default function ArtisansDisplay({ userProfile, user }: ArtisansDisplayProps) {
  return (
    <>
      {userProfile ? (
        <article className={styles.artisanProfile} aria-label="Artisans Profile">
          {userProfile.image_url && <Image src={userProfile.image_url ?? "/users/amy-burns.png"} alt={`profile picture of ${userProfile.name ?? "Artisan"}`} width={100} height={100} />}
          <h2>{userProfile.name ?? user?.email}</h2>
          {userProfile.bio && <p>{userProfile.bio}</p>}
          {userProfile.age && <p>Age: {userProfile.age}</p>}
          {userProfile.gender && <p>Gender: {userProfile.gender === "female" ? "Female" : "Male"}</p>}
          <p>Joined: {user ? new Date(user.created_at).toLocaleDateString() : "Unknown"}</p>
        </article>
      ) : (
        <p role="status">No profile found.</p>
      )}
    </>
  )
}