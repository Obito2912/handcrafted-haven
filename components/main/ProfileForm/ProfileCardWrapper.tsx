import ProfileCard from "./ProfileCard";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";
import Link from "next/dist/client/link";
import './ProfileCardWrapper.css';

type ProfileCardWrapperProps = {
    userProfiles?: UserProfileValue[];
};

export default async function ProfileCardWrapper({
    userProfiles = [],
}: ProfileCardWrapperProps) {
    return (
        <section aria-label="Artisan Profiles">
            <ul className="card__wrapper editable-card__wrapper">
                {userProfiles.map((userProfile) => (
                    <li key={userProfile.user_id} className="card__wrapper_item">
                        <Link key={userProfile.user_id} href={`/artisans/${userProfile.user_id}`} aria-label={`View profile of ${userProfile.name}`}>
                            <ProfileCard key={userProfile.user_id} {...userProfile} />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}