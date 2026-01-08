import { Montserrat, Roboto_Slab } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  title: "Roama | Le n°1 de l’immobilier entre particuliers au Maroc",
  description: "Immobilier sans commission au Maroc",
};

import Provider from "@/components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${robotoSlab.variable}`}>
      <body suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
