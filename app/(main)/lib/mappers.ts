import { UserProfileValue} from "./schemas/profileSchemas";
import { UserProfile } from "./definitions";

export function toUserProfileValues(profile: UserProfile | null): UserProfileValue {
    return {
        user_id: profile?.user_id || '',
        name: profile?.name || '',
        bio: profile?.bio || "",        
        gender: profile?.gender === "male" ? "male" : "female",
        image_url: profile?.image_url || "",
        age: profile?.age || undefined,
        user_type: profile?.user_type === "seller" ? "seller" : "buyer"
    };
}
