import Aside from "@/components/Aside/Aside";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { auth } from '@/auth';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const userId = session?.user?.id;
    console.log("User ID in Profile page:", userId);
    const loggedIn = !!userId;
    return (
        <div className="page">
            <div className="page__content">
                <Header />
                <div className="page__container">
                    <Aside loggedIn={loggedIn} />
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}