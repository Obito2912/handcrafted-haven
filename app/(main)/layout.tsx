import Aside from "@/components/layout/Aside/Aside";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import { auth } from "@/auth";
import { fetchUserProfile } from "@/app/(main)/lib/data";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const userProfile = session?.user?.id
        ? await fetchUserProfile(session.user.id)
        : null;
    const userType = userProfile?.user_type ?? null;
    const userProfileImg = userProfile?.image_url ?? null;

    console.log('Session in layout:', session); // Debug log

    return (
        <div className="page">
            <div className="page__content">
                <Header
                    isAuthenticated={isAuthenticated}
                    userProfileImg={userProfileImg}
                    showSignIn={true} />
                <div className="page__container">
                    <Aside
                        isAuthenticated={isAuthenticated}
                        userType={userType} />
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}