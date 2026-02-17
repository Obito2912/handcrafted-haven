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
          <h2 className={styles.artisanProfile__heading}>{userProfile.name ?? user?.email}</h2>
          {userProfile.bio && <p className={styles.artisanProfile__bio}>{userProfile.bio}</p>}
          {userProfile.age && <p className={styles.artisanProfile__age}>Age: {userProfile.age}</p>}
          {userProfile.gender && <p className={styles.artisanProfile__gender}>Gender: {userProfile.gender === "female" ? "Female" : "Male"}</p>}
          <p className={styles.artisanProfile__joined}>Joined: {user ? new Date(user.created_at).toLocaleDateString() : "Unknown"}</p>
        </article>
      ) : (
        <p role="status">No profile found.</p>
      )}
    </>
  )
}