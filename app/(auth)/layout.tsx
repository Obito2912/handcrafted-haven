import "@/app/styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Handcrafted Haven",
    description: "Login to Handcrafted Haven",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
