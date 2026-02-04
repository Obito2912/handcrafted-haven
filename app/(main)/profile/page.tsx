import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { fetchUserProfile } from "../lib/data";
import { getLoggedInInfo } from "../lib/session";

export default async function Profile() {
    const { userId } = await getLoggedInInfo();
    console.log("User ID in Profile page:", userId);
    if (!userId) {
        return (
            <main className="">
                <p>You must be logged in to view this data.</p>
            </main>
        )
    }
    const userProfile = await fetchUserProfile(userId);

    return (
        <main className="">
            <ProfileForm initialValues={userProfile?.userProfile ?? undefined} />
        </main>
    );
}

