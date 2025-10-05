import { Raleway, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: 'Vaishnavi Photography',
  description: 'Capture Your Moments with Vaishnavi Photography',
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${playfair.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}