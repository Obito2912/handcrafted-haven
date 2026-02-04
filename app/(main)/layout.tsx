import Aside from "@/components/Aside/Aside";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { auth } from "@/auth";
// import { fetchUserProfile } from "@/app/(main)/lib/data";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    // const userProfileData = session?.user?.id
    //     ? await fetchUserProfile(session.user.id)
    //     : null;
    // const userProfileImg = userProfileData?.userProfile?.image_url ?? null;

    console.log('Session in layout:', session); // Debug log

    return (
        <div className="page">
            <div className="page__content">
                <Header
                    isAuthenticated={isAuthenticated}
                    userProfileImg={null} />
                <div className="page__container">
                    <Aside isAuthenticated={isAuthenticated} />
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}