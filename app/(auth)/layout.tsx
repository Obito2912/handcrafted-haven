import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import '../styles/global.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <div className="page__content">
                <Header showSignIn={false} />
                <div className="page__container">
                    <main className="main">{children}</main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
