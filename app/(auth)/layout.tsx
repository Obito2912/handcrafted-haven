import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import { Metadata } from "next";
import '../styles/global.css';

export const metadata: Metadata = {
    title: "Login | Handcrafted Haven",
    description: "Login to Handcrafted Haven",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <div className="page__content">
                <Header showSignIn={false} />
                <div className="page__container">
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
