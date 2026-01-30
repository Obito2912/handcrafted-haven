import "@/app/ui/global.css";
import Aside from "@/components/Aside/Aside";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Handcrafted Haven",
    default: "Handcrafted Haven",
  },
  description: "The official site for Handcrafted Haven",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        />
      </head>
      <body>
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
      </body>
    </html>
  );
}
