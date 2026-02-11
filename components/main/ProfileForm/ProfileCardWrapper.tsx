import { UserProfile } from "@/app/(main)/lib/definitions";
import ProfileCard from "./ProfileCard";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";
import Link from "next/dist/client/link";

type ProfileCardWrapperProps = {
    userProfiles?: UserProfileValue[];
};

export default async function ProfileCardWrapper({
    userProfiles = [],
}: ProfileCardWrapperProps) {    
    return (
        <div className="card__wrapper editable-card__wrapper">
            {userProfiles.map((userProfile) => (
                <Link key={userProfile.user_id} href={`/artisans/${userProfile.user_id}`}>  
                <ProfileCard key={userProfile.user_id} {...userProfile} />
                </Link>
            ))}
        </div>
    );
}