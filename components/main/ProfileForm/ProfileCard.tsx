import { UserProfile } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import "../../shared/Card/Card.css";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";

export default function ProfileCard(userProfile: UserProfileValue){
    console.log("Rendering ProfileCard for user:", userProfile);
    return (
        <div className="card">
            <div className="card__image-container">
                {userProfile.image_url && <Image 
                    src={userProfile.image_url}
                    alt={userProfile.name}
                    width={128}
                    height={128}
                    className="card__image"
                />}
            </div>
            <h2 className="card__title">{userProfile.name}</h2>            
        </div>
    );
}