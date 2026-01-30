import Aside from "@/components/Aside/Aside";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <div className="page__content">
                <Header />
                <div className="page__container">
                    <Aside />
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}