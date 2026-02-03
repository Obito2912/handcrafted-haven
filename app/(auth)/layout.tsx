import "@/app/styles/global.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Handcrafted Haven",
    description: "Login to Handcrafted Haven",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <div className="page__content">
                <Header />
                <div className="page__container">
                    <main className="main">{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
