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
  title: "Selfhome | Le n°1 de l’immobilier entre particuliers au Luxembourg",
  description: "Immobilier sans commission au Luxembourg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}
