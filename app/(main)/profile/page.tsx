import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { auth } from "@/auth";
import { fetchUserProfile } from "../lib/data";

export default async function Profile() {
    const session = await auth();
    const userId = session?.user?.id;
    console.log("User ID in Profile page:", userId);
    if (!userId) {
        return (
            <main className="">
                <p>You must be logged in to view this data.</p>
            </main>
        )
    }
    const { userProfile } = await fetchUserProfile(userId);

    return (
        <main className="">
            <ProfileForm initialValues={userProfile ?? undefined} />
        </main>
    );
}